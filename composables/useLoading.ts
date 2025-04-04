import type { DebounceFilterOptions } from '@vueuse/core'

type LoadingCloseable = () => void

type ErrorFn = (ex: unknown) => Promise<void> | void

interface LoadingState {
  tags: string[]
}

const state = ref<LoadingState>({
  tags: [],
})

export const useLoading = () => {
  const open = (tag: string): LoadingCloseable => {
    // state.value.tags.push(tag);
    state.value = {
      ...state.value,
      tags: [...state.value.tags, tag],
    }

    return () => close(tag)
  }

  const close = (tag?: string) => {
    if (tag) {
      // state.value.tags = state.value.tags.filter((value) => value != tag);
      state.value = {
        ...state.value,
        tags: state.value.tags.filter(value => value !== tag),
      }
    } else {
      state.value = {
        ...state.value,
        tags: [],
      }
    }
  }

  const isOpening = computed(() => {
    return state.value.tags.length > 0
  })

  const run = async <R = void>(
    tag: string,
    fn: () => Promise<R | undefined>,
    errorFn?: ErrorFn) => {
    open(tag)
    try {
      return await fn()
    } catch (ex) {
      if (errorFn) {
        await errorFn(ex)
      }
    } finally {
      close(tag)
    }
  }

  const watchToggle = (tag: string, ref: Ref<boolean>, options?: {
    immediate?: boolean
  }) => {
    watch(ref, (isOpening) => {
      if (isOpening) {
        open(tag)
        return
      }
      close(tag)
    }, { immediate: options?.immediate ?? true })
  }

  const watcher = (tag: string, refs: Ref<boolean> | Ref<boolean>[], options?: {
    immediate?: boolean
  }) => {
    if (Array.isArray(refs)) {
      refs.forEach((ref, index) => {
        watchToggle(`tag:${index}`, ref, options)
      })
    } else {
      watchToggle(tag, refs, options)
    }
  }

  return {
    open,
    close,
    isOpening,
    run,
    watch: watcher,
  }
}

const loading = useLoading()

export const useLoadingFn = <T, P = void>(
  tag: string,
  fn: (params?: P) => Promise<T>,
  errorFn?: ErrorFn,
) => {
  return async (params?: P) => {
    return loading.run(tag, async () => {
      return await fn(params)
    },
    errorFn)
  }
}

export const useDebounceLoadingFn = <T, P = void>(
  tag: string,
  fn: (params?: P) => Promise<T>,
  errorFn?: ErrorFn,
  ms?: MaybeRefOrGetter<number>,
  options?: DebounceFilterOptions,
) => {
  return useDebounceFn(
    useLoadingFn(tag, fn, errorFn),
    ms,
    options)
}

export const useThrottleLoadingFn = <T, P = void>(
  tag: string,
  fn: (params?: P) => Promise<T>,
  errorFn?: ErrorFn,
  ms?: MaybeRefOrGetter<number>,
  trailing?: boolean,
  leading?: boolean,
  rejectOnCancel?: boolean,
) => {
  return useThrottleFn(
    useLoadingFn(tag, fn, errorFn),
    ms,
    trailing,
    leading,
    rejectOnCancel,
  )
}
