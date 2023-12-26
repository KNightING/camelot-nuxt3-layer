import type { DebounceFilterOptions } from '@vueuse/core'

type LoadingCloseable = () => void;

interface LoadingState {
  tags: string[];
}

const state = ref<LoadingState>({
  tags: []
})

export const useLoading = () => {
  const open = (tag: string): LoadingCloseable => {
    // state.value.tags.push(tag);
    state.value = {
      ...state.value,
      tags: [...state.value.tags, tag]
    }

    return () => close(tag)
  }

  const close = (tag?: string) => {
    if (tag) {
      // state.value.tags = state.value.tags.filter((value) => value != tag);
      state.value = {
        ...state.value,
        tags: state.value.tags.filter(value => value !== tag)
      }
    } else {
      state.value = {
        ...state.value,
        tags: []
      }
    }
  }

  const isOpening = computed(() => {
    return state.value.tags.length > 0
  })

  return { state, open, close, isOpening }
}

export const useLoadingFn = <T, P = void>(
  tag: string,
  fn: (params?: P) => Promise<T>
) => {
  return async (params?: P) => {
    const { open, close } = useLoading()
    open(tag)
    const result = await fn(params)
    close(tag)
    return result
  }
}

export const useDebounceLoadingFn = <T, P = void>(
  tag: string,
  fn: (params?: P) => Promise<T>,
  ms?: globalThis.MaybeRefOrGetter<number>,
  options?: DebounceFilterOptions
) => {
  return useDebounceFn(useLoadingFn(tag, fn), ms, options)
}

export const useThrottleLoadingFn = <T, P = void>(
  tag: string,
  fn: (params?: P) => Promise<T>,
  ms?: globalThis.MaybeRefOrGetter<number>,
  trailing?: boolean,
  leading?: boolean,
  rejectOnCancel?: boolean
) => {
  return useThrottleFn(
    useLoadingFn(tag, fn),
    ms,
    trailing,
    leading,
    rejectOnCancel
  )
}
