import type { UseFetchOptions } from 'nuxt/app'
import type { FetchContext, FetchResponse } from 'ofetch'
import { toValue } from '@vueuse/shared'
import { resolveOptionsAndHash } from 'naive-ui/es/image/src/utils'

export type Url =
  | string
  | Request
  | Ref<string | Request>
  | (() => string | Request);

export enum ContentType {
  Json,
  MultiPartFormData,
}

export enum AuthorizationType {
  Non,
  Basic,
  BearerJWT,
}

export type ExtendsFetchOptions = {
  authorizationType?: AuthorizationType;
  contentType?: ContentType;

  /**
  * "default" 目前與 "clearNuxtData" 相同: 需先設定key
  */
  cachePolicy?: 'default' | 'clearNuxtData' | 'useNuxtData',
  getToken?: () => (Promise<string> | string)
};

const defaultExtendsFetchOptions: ExtendsFetchOptions = {
  authorizationType: AuthorizationType.BearerJWT,
  contentType: ContentType.Json,
  cachePolicy: 'default'
}

export type FetchOptions<
  DataT = any,
  T extends ExtendsFetchOptions = ExtendsFetchOptions
> = UseFetchOptions<DataT> & T;

export class BaseApi<T extends ExtendsFetchOptions = ExtendsFetchOptions> {
  baseFetchOptions<DataT>(): FetchOptions<DataT, T> {
    return <T>{}
  }

  getBaseToken(): Promise<string> | string {
    return ''
  }

  private async mergeFetchOptions<DataT>(
    options?: FetchOptions<DataT, T>
  ): Promise<FetchOptions<DataT, T>> {
    let opt = {
      ...defaultExtendsFetchOptions,
      ...this.baseFetchOptions<DataT>(),
      ...(options ?? {})
    }

    const headers: Record<string, any> = {
      // 阻止瀏覽器探知檔案的 mime type
      'X-Content-Type-Options': 'nosniff',
      // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
      'Referrer-Policy': 'same-origin',
      Authorization: '',
      ...(this.baseFetchOptions().headers ?? {}),
      ...(opt.headers ?? {})
    }

    let token = ''
    if (opt.getToken) {
      token = await opt.getToken()
    } else {
      token = await this.getBaseToken()
    }

    switch (opt.authorizationType) {
      case AuthorizationType.BearerJWT: {
        headers.Authorization = `Bearer ${token}`
        break
      }

      case AuthorizationType.Basic: {
        headers.Authorization = `Basic ${token}`
        break
      }
    }

    switch (opt.contentType) {
      case ContentType.Json: {
        headers['Content-Type'] = 'application/json'
      }
    }

    opt = {
      ...opt,
      headers
    }

    if (opt?.cachePolicy === 'default' || opt?.cachePolicy === 'clearNuxtData') {
      clearNuxtData(opt.key)
    }

    return opt
  }

  private async useFetchWrapper<DataT>(
    url: Url,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    options?: FetchOptions<DataT, T>
  ) {
    const getFetchOptions = async () => {
      return await this.mergeFetchOptions(options)
    }

    const { data, error, refresh, execute, status, pending } = await useFetch(
      url,
      {
        ...await this.mergeFetchOptions(options),
        method,
        getCachedData(key) {
          if (options?.cachePolicy === 'useNuxtData') {
            if (useNuxtData(key).data.value) {
              return useNuxtData(key)
            }
          }
        },
        async onRequest({ options: opts }) {
          const mergeOpts = await getFetchOptions()
          opts.headers = { ...opts.headers, ...mergeOpts.headers as Record<string, string> }
          opts.body = mergeOpts.body
          opts.onRequest?.bind(opts)
        }
      }
    )
    // when options set immediate is false, pending default is true, but status is idle
    const isPending = computed(() => status.value === 'pending')
    const isSuccess = computed(() => status.value === 'success')
    const isError = computed(() => status.value === 'error')
    return { data, error, refresh, status, pending, isSuccess, isError, isPending }
  }

  protected async get<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, 'get', options)
  }

  protected async post<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, 'post', options)
  }

  protected async patch<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, 'patch', options)
  }

  protected async put<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, 'put', options)
  }

  protected async delete<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, 'delete', options)
  }
}

export const useBasicToken = (account: string, pwd: string): string => {
  return btoa(`${account}:${pwd}`)
}

export const useBaseApi = () => {
  return BaseApi
}

// class ExampleApi extends BaseApi {
//   baseFetchOptions<DataT>(): FetchOptions<DataT, ExtendsFetchOptions> {
//     return {
//       baseURL: '',
//       timeout: 30000,
//       onResponseError(context) {
//         if (context.response.status === 401) {
//           clearNuxtData('token')
//         }
//       }
//     }
//   }

//   async getBaseToken(): Promise<string> {
//     return await new Promise<string>((resolve, reject) => { })
//   }
// }

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
  cachePolicy?: 'default' | 'clearNuxtData' | 'useNuxtData',
  onRequests?: OnRequest[],
  onResponses?: OnResponse<DataT>[],
  onResponseErrors?: OnResponseError<DataT>[]
};

const useApiFetch = async <DataT>(
  url: Url,
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  options?: ApiFetchOptions<DataT>
) => {
  if (!options) {
    options = {}
  }
  options.cachePolicy = options.cachePolicy ?? 'default'
  options.contentType = ContentType.Json

  const statusCode = ref(0)
  const { data, error, refresh, status, pending } = await useFetch(
    url,
    {
      ...options,
      method,
      getCachedData(key) {
        if (options.cachePolicy === 'useNuxtData') {
          const data = useNuxtData<DataT>(key).data.value
          if (data) {
            return data
          }
        }
      },
      async onRequest(context) {
        if (options.cachePolicy || options.cachePolicy === 'default' || options?.cachePolicy === 'clearNuxtData') {
          clearNuxtData(options.key)
        }

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
            await request(context)
          }
        }
      },
      async onResponse(context) {
        statusCode.value = context.response.status
        if (options.onResponses) {
          for (const onResponse of options.onResponses) {
            await onResponse(context)
          }
        }
      },
      async onResponseError(context) {
        statusCode.value = context.response.status
        if (options.onResponseErrors) {
          for (const onResponseError of options.onResponseErrors) {
            await onResponseError(context)
          }
        }
      }
    }
  )
  // when options set immediate is false, pending default is true, but status is idle
  const isPending = computed(() => status.value === 'pending')
  const isSuccess = computed(() => status.value === 'success')
  const isError = computed(() => status.value === 'error')
  return { data, error, refresh, status, pending, isSuccess, isError, isPending, statusCode }
}

export const useGetFetch = <DataT>(
  url: Url,
  options?: ApiFetchOptions<DataT>
) => {
  return useApiFetch(url, 'get', options)
}

export const usePostFetch = <DataT>(
  url: Url,
  options?: ApiFetchOptions<DataT>
) => {
  return useApiFetch(url, 'post', options)
}

export const usePatchFetch = <DataT>(
  url: Url,
  options?: ApiFetchOptions<DataT>
) => {
  return useApiFetch(url, 'patch', options)
}

export const usePutFetch = <DataT>(
  url: Url,
  options?: ApiFetchOptions<DataT>
) => {
  return useApiFetch(url, 'put', options)
}

export const useDeleteFetch = <DataT>(
  url: Url,
  options?: ApiFetchOptions<DataT>
) => {
  return useApiFetch(url, 'delete', options)
}
