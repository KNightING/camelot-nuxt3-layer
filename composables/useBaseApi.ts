import type { UseFetchOptions } from 'nuxt/app'
import type { FetchContext, FetchResponse, FetchError, ResponseType } from 'ofetch'
import type { NitroFetchOptions } from 'nitropack/types'

export type Url = string | Request | Ref<string | Request> | (() => string | Request)

export enum ContentType {
  Json,
  MultiPartFormData,
}

export const useBasicToken = (account: string, pwd: string): string => {
  return btoa(`${account}:${pwd}`)
}

export type OnRequest = (context: FetchContext) => Promise<void> | void

export type OnResponse<R> = (context: FetchContext & {
  response: FetchResponse<R>
}) => Promise<void> | void

export type OnResponseError<R> = (context: FetchContext & {
  response: FetchResponse<R>
}) => Promise<void> | void

export const useBasicTokenRequest = (accountRef: MaybeRefOrGetter<string>, pwdRef: MaybeRefOrGetter<string>): OnRequest => {
  return ({ options }) => {
    const account = toValue(accountRef)
    const pwd = toValue(pwdRef)
    if (account.length <= 0 || pwd.length <= 0) {
      return
    }
    const token = useBasicToken(account, pwd)
    options.headers.set('Authorization', `Basic ${token}`)
  }
}

export const useBearerTokenRequest = (tokenRef: MaybeRefOrGetter<string>): OnRequest => {
  return ({ options }) => {
    const token = toValue(tokenRef)
    if (token.length <= 0) {
      return
    }
    options.headers.set('Authorization', `Bearer ${token}`)
  }
}

export const secureHeaderRequest: OnRequest = ({ options }) => {
  // 阻止瀏覽器探知檔案的 mime type
  options.headers.set('X-Content-Type-Options', 'nosniff')

  // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
  options.headers.set('Referrer-Policy', 'same-origin')
}

export type ApiFetchOptions<
  DataT = any,
> = Omit<UseFetchOptions<DataT>, 'onRequest' | 'onRequestError' | 'onResponse' | 'onResponseError'> & {
  contentType?: ContentType
  /**
  * "default" 目前與 "clearNuxtData" 相同: 需先設定key
  */
  cachePolicy?: 'none' | 'cache'
  onRequests?: OnRequest[]
  onResponses?: OnResponse<DataT>[]
  onResponseErrors?: OnResponseError<DataT>[]
  addSecureHeaderRequest?: boolean
}

const useApiFetch = <DataT>(
  url: Url,
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  options?: ApiFetchOptions<DataT>,
) => {
  if (!options) {
    options = {}
  }
  options.cachePolicy = options.cachePolicy ?? 'none'
  options.contentType = options.contentType ?? ContentType.Json
  options.addSecureHeaderRequest = options.addSecureHeaderRequest ?? true

  const use = (mergeOptions: ApiFetchOptions<DataT> = {}) => useFetch(
    url,
    {
      ...options,
      ...mergeOptions,
      method,
      getCachedData(key: string) {
        if (options.cachePolicy === 'cache') {
          const data = useNuxtData<DataT>(key).data.value
          if (data) {
            return data
          }
        }
      },
      async onRequest(context: FetchContext<any, ResponseType>) {
        switch (options.contentType) {
          case ContentType.Json: {
            context.options.headers.set('Content-Type', 'application/json')
          }
        }

        if (options.addSecureHeaderRequest) {
          secureHeaderRequest(context)
        }

        if (options.onRequests) {
          for (const request of options.onRequests) {
            await request(context)
          }
        }
      },
      async onResponse(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT> }) {
        // statusCode.value = context.response.status
        if (options.onResponses) {
          for (const onResponse of options.onResponses) {
            await onResponse(context)
          }
        }
      },
      async onResponseError(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT> }) {
        // statusCode.value = context.response.status
        if (options.onResponseErrors) {
          for (const onResponseError of options.onResponseErrors) {
            await onResponseError(context)
          }
        }
      },
    },
  )

  const useFetchBetter = (mergeOptions: ApiFetchOptions<DataT> = {}) => {
    const {
      data,
      refresh,
      error,
      clear,
      status,
    } = use({
      dedupe: 'defer',
      immediate: false,
      ...mergeOptions,
    })

    const idle = computed(() => {
      return status.value === 'idle'
    })

    const pending = computed(() => {
      return status.value === 'pending'
    })

    const success = computed(() => {
      return status.value === 'success'
    })

    return {
      data,
      refresh,
      error,
      clear,
      status,
      idle,
      pending,
      success,
    }
  }

  const fetch = (opts: NitroFetchOptions<any> = {}) => {
    let header: HeadersInit | undefined

    if (isRef(options.headers)) {
      header = toValue(options.headers) as HeadersInit
    } else {
      header = options.headers as HeadersInit
    }

    let realUrl = url
    if (isRef(url)) {
      realUrl = toValue(url)
    }

    if (realUrl instanceof Request) {
      realUrl = realUrl.url
    } else if (realUrl instanceof Function) {
      realUrl = realUrl()
    }

    return $fetch<DataT>(realUrl as string,
      {
        ...opts,
        method,
        baseURL: toValue(options.baseURL),
        headers: header,
        query: toValue(options.query),
        body: toValue(options.body),
        credentials: toValue(options.credentials),
        mode: toValue(options.mode),
        redirect: toValue(options.redirect),
        referrer: toValue(options.referrer),
        referrerPolicy: toValue(options.referrerPolicy),
        async onRequest(context: FetchContext<any, ResponseType>) {
          switch (options.contentType) {
            case ContentType.Json: {
              context.options.headers.set('Content-Type', 'application/json')
            }
          }

          if (options.addSecureHeaderRequest) {
            secureHeaderRequest(context)
          }

          if (options.onRequests) {
            for (const request of options.onRequests) {
              await request(context)
            }
          }
        },
        async onResponse(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT> }) {
          // statusCode.value = context.response.status
          if (options.onResponses) {
            for (const onResponse of options.onResponses) {
              await onResponse(context)
            }
          }
        },
        async onResponseError(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT> }) {
          // statusCode.value = context.response.status
          if (options.onResponseErrors) {
            for (const onResponseError of options.onResponseErrors) {
              await onResponseError(context)
            }
          }
        },
      })
  }

  return {
    useFetch: use,
    useFetchBetter,
    fetch,
  }
}

export const useBaseApi = (baseOptions: ApiFetchOptions<any>) => {
  const get = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'get', {
      ...baseOptions,
      ...(options ?? {}),
    })

  const post = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'post', {
      ...baseOptions,
      ...(options ?? {}),
    })

  const put = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'put', {
      ...baseOptions,
      ...(options ?? {}),
    })

  const patch = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'patch', {
      ...baseOptions,
      ...(options ?? {}),
    })

  const del = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'delete', {
      ...baseOptions,
      ...(options ?? {}),
    })

  return {
    get,
    post,
    patch,
    put,
    del,
  }
}
