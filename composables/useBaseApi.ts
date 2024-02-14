import type { UseFetchOptions } from 'nuxt/app'
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
    const { data, error, refresh, execute, status, pending } = await useFetch(
      url,
      {
        method,
        getCachedData(key) {
          if (options?.cachePolicy === 'useNuxtData') {
            if (useNuxtData(key).data.value) {
              return useNuxtData(key)
            }
          }
        },
        onRequest: async ({ options: opts }) => {
          const mergeOpts = await this.mergeFetchOptions(options)
          opts = { ...opts, ...mergeOpts }
          opts.headers = { ...opts.headers, 'x-now': Date.now().toString() }
          // opts.onRequest?.bind(opts)
        }
      }
    )
    const isSuccess = computed(() => status.value === 'success')
    const isError = computed(() => status.value === 'error')
    return { data, error, refresh, status, pending, isSuccess, isError }
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
