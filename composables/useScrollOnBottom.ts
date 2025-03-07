import { isClient } from '@vueuse/core'

export const useScrollOnBottom = (options: {
  target?: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>
  offset?: MaybeRefOrGetter<number>
}) => {
  const isOnBottom = ref(false)

  if (!isClient) {
    return { isOnBottom }
  }

  const offset = computed(() => {
    return toValue(options.offset) ?? 20
  })

  const target = computed(() => {
    const target = toValue(options.target)

    if (target === undefined) {
      return document.documentElement
    }

    if (target instanceof Window) {
      return document.documentElement
    }

    if (target instanceof Document) {
      return document.documentElement
    }

    return target
  })

  const checkOnBottom = () => {
    const scrollTop = target.value?.scrollTop ?? window.scrollY ?? 0
    const viewportHeight = target.value?.clientHeight ?? window.visualViewport?.height ?? window.innerHeight
    // const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const totalHeight = target.value?.scrollHeight ?? 0

    if (scrollTop + viewportHeight >= totalHeight - offset.value) {
      isOnBottom.value = true
    } else {
      isOnBottom.value = false
    }
  }

  useEventListener(target, 'scroll', checkOnBottom)
  useEventListener(target, 'resize', checkOnBottom)
  useEventListener(window.visualViewport, 'resize', checkOnBottom)

  return {
    isOnBottom,
  }
}
