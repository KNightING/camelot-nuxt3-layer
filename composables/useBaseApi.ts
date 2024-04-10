import type { UseFetchOptions } from 'nuxt/app'
import type { FetchContext, FetchResponse, FetchError, ResponseType } from 'ofetch'
import { toValue } from '@vueuse/shared'

export type Url =
  | string
  | Request
  | Ref<string | Request>
  | (() => string | Request);

export enum ContentType {
  Json,
  MultiPartFormData,
}

export const useBasicToken = (account: string, pwd: string): string => {
  return btoa(`${account}:${pwd}`)
}

export type OnRequest = (context: FetchContext) => Promise<void> | void;

export type OnResponse<R> = (context: FetchContext & {
  response: FetchResponse<R>;
}) => Promise<void> | void;

export type OnResponseError<R> = (context: FetchContext & {
  response: FetchResponse<R>;
}) => Promise<void> | void;

export const useDefaultHeaders = () => {
  return reactive({
    // 阻止瀏覽器探知檔案的 mime type
    'X-Content-Type-Options': 'nosniff',
    // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
    'Referrer-Policy': 'same-origin'
  })
}

export const useBasicTokenRequest = (accountRef: MaybeRefOrGetter<string>, pwdRef: MaybeRefOrGetter<string>): OnRequest => {
  return ({ options }) => {
    const account = toValue(accountRef)
    const pwd = toValue(pwdRef)
    const token = useBasicToken(account, pwd)
    options.headers = { ...options.headers, Authorization: `Basic ${token}` }
  }
}

export const useBearerTokenRequest = (tokenRef: MaybeRefOrGetter<string>): OnRequest => {
  return ({ options }) => {
    const token = toValue(tokenRef)
    options.headers = { ...options.headers, Authorization: `Bearer ${token}` }
  }
}

export type ApiFetchOptions<
  DataT = any
> = Omit<UseFetchOptions<DataT>, 'onRequest' | 'onRequestError' | 'onResponse' | 'onResponseError'> & {
  contentType?: ContentType;
  /**
  * "default" 目前與 "clearNuxtData" 相同: 需先設定key
  */
  cachePolicy?: 'none' | 'cache',
  onRequests?: OnRequest[],
  onResponses?: OnResponse<DataT>[],
  onResponseErrors?: OnResponseError<DataT>[]
};

const useApiFetch = <DataT>(
  url: Url,
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  options?: ApiFetchOptions<DataT>
) => {
  if (!options) {
    options = {}
  }
  options.cachePolicy = options.cachePolicy ?? 'none'
  options.contentType = options.contentType ?? ContentType.Json

  const use = () => useFetch(
    url,
    {
      ...options,
      method,
      getCachedData(key: string) {
        if (options.cachePolicy === 'cache') {
          const data = useNuxtData<DataT>(key).data.value
          if (data) {
            return data
          }
        }
      },
      onRequest(context: FetchContext<any, ResponseType>) {
        if (!context.options.headers) {
          context.options.headers = {}
        }

        switch (options.contentType) {
          case ContentType.Json: {
            context.options.headers = {
              ...context.options.headers,
              'Content-Type': 'application/json'
            }
          }
        }

        context.options.headers = {
          // 阻止瀏覽器探知檔案的 mime type
          'X-Content-Type-Options': 'nosniff',
          // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
          'Referrer-Policy': 'same-origin',
          ...context.options.headers
        }

        if (options.onRequests) {
          for (const request of options.onRequests) {
            request(context)
          }
        }
      },
      async onResponse(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT>; }) {
        // statusCode.value = context.response.status
        if (options.onResponses) {
          for (const onResponse of options.onResponses) {
            await onResponse(context)
          }
        }
      },
      async onResponseError(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT>; }) {
        // statusCode.value = context.response.status
        if (options.onResponseErrors) {
          for (const onResponseError of options.onResponseErrors) {
            await onResponseError(context)
          }
        }
      }
    }
  )

  const fetch = () => {
    let header: HeadersInit | undefined

    if (isRef(options.headers)) {
      header = toValue(options.headers) as HeadersInit
    } else {
      header = options.headers as HeadersInit
    }

    return $fetch(url,
      {
        method,
        baseURL: toValue(options.baseURL),
        headers: header,
        query: toValue(options.query),
        body: toValue(options.body),
        cachePolicy: options.cachePolicy,
        credentials: toValue(options.credentials),
        mode: toValue(options.mode),
        redirect: toValue(options.redirect),
        referrer: toValue(options.referrer),
        referrerPolicy: toValue(options.referrerPolicy),
        onRequest(context: FetchContext<any, ResponseType>) {
          if (!context.options.headers) {
            context.options.headers = {}
          }

          switch (options.contentType) {
            case ContentType.Json: {
              context.options.headers = {
                ...context.options.headers,
                'Content-Type': 'application/json'
              }
            }
          }

          context.options.headers = {
            // 阻止瀏覽器探知檔案的 mime type
            'X-Content-Type-Options': 'nosniff',
            // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
            'Referrer-Policy': 'same-origin',
            ...context.options.headers
          }

          if (options.onRequests) {
            for (const request of options.onRequests) {
              request(context)
            }
          }
        },
        async onResponse(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT>; }) {
          // statusCode.value = context.response.status
          if (options.onResponses) {
            for (const onResponse of options.onResponses) {
              await onResponse(context)
            }
          }
        },
        async onResponseError(context: FetchContext<any, ResponseType> & { response: FetchResponse<DataT>; }) {
          // statusCode.value = context.response.status
          if (options.onResponseErrors) {
            for (const onResponseError of options.onResponseErrors) {
              await onResponseError(context)
            }
          }
        }
      })
  }

  return {
    useFetch: use,
    fetch
  }
}

export const useBaseApi = (baseOptions: UseFetchOptions<any>) => {
  const get = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'get', {
      ...baseOptions,
      ...(options ?? {})
    })

  const post = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'post', {
      ...baseOptions,
      ...(options ?? {})
    })

  const put = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'put', {
      ...baseOptions,
      ...(options ?? {})
    })

  const patch = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'patch', {
      ...baseOptions,
      ...(options ?? {})
    })

  const del = <DataT>(url: Url, options?: ApiFetchOptions<DataT>) =>
    useApiFetch<DataT>(url, 'delete', {
      ...baseOptions,
      ...(options ?? {})
    })

  return {
    get,
    post,
    patch,
    put,
    del
  }
}
