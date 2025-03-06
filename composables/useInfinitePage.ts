import { isClient } from '@vueuse/core'

export const useInfinitePage = (options: {
  nextPage: VoidFunction
  isPending: Ref<boolean | null | undefined>
  isEnd?: Ref<boolean | null | undefined>
}) => {
  const nextPage = useThrottleFn(() => {
    if (options.isEnd && options.isEnd.value) {
      return
    }

    if (options.isPending.value) {
      return
    }

    options.nextPage()
  })

  const { arrivedState } = useScroll(document, { offset: { bottom: 20 } })

  watch(arrivedState, (arrivedState) => {
    if (arrivedState.bottom) {
      nextPage()
    }
  }, { immediate: true })

  if (isClient) {
    let timeout: NodeJS.Timeout | undefined = undefined

    // 如果資料異動, 但是頁面不能滾動則測試呼叫下一頁
    watch(options.isPending, (isPending) => {
      if (timeout) {
        clearTimeout(timeout)
      }
      if (!isPending) {
        timeout = setTimeout(() => {
          if (document.documentElement
            && document.documentElement.scrollHeight <= document.documentElement.clientHeight
          ) {
            nextPage()
          }
        }, 100)
      }
    })
  }
}
