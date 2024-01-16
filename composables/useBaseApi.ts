import type { UseFetchOptions } from 'nuxt/app'

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
  BearerJWT,
}

export type ExtendsFetchOptions = {
  authorizationType?: AuthorizationType;
  contentType?: ContentType;

  /**
  * "default" 目前與 "clearNuxtData" 相同: 需先設定key
  */
  cachePolicy?: 'default' | 'clearNuxtData' | 'useNuxtData'
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
  protected baseFetchOptions<DataT>(): FetchOptions<DataT, T> {
    return <T>{}
  }

  protected async getJwtToken(): Promise<string> {
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

    let headers: Record<string, any> = {
      // 阻止瀏覽器探知檔案的 mime type
      'X-Content-Type-Options': 'nosniff',
      // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
      'Referrer-Policy': 'same-origin',
      Authorization: '',
      ...(this.baseFetchOptions().headers ?? {}),
      ...(opt.headers ?? {})
    }

    switch (opt.authorizationType) {
      case AuthorizationType.BearerJWT: {
        const jwt = await this.getJwtToken()

        headers = {
          ...headers,
          Authorization: `Bearer ${jwt}`
        }
      }
    }

    switch (opt.contentType) {
      case ContentType.Json: {
        headers = {
          ...headers,
          'Content-Type': 'application/json'
        }
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
        ...(await this.mergeFetchOptions(options)),
        method,
        getCachedData(key) {
          if (options?.cachePolicy === 'useNuxtData') {
            if (useNuxtData(key).data.value) {
              return useNuxtData(key)
            }
          }
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

export const useBaseApi = () => {
  return BaseApi
}
