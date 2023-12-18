import type { UseFetchOptions } from "nuxt/app";

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
  // 需要設定key
  clearCache?: boolean;
};

const defaultExtendsFetchOptions: ExtendsFetchOptions = {
  authorizationType: AuthorizationType.BearerJWT,
  contentType: ContentType.Json,
  clearCache: true,
};

export type FetchOptions<
  DataT = any,
  T extends ExtendsFetchOptions = ExtendsFetchOptions
> = UseFetchOptions<DataT> & T;

abstract class BaseApi<T extends ExtendsFetchOptions = ExtendsFetchOptions> {
  protected abstract baseFetchOptions<DataT>(): FetchOptions<DataT, T>;

  protected abstract getJwtToken(): Promise<string>;

  private async mergeFetchOptions<DataT>(
    options?: FetchOptions<DataT, T>
  ): Promise<FetchOptions<DataT, T>> {
    let opt = {
      ...defaultExtendsFetchOptions,
      ...this.baseFetchOptions<DataT>(),
      ...(options ?? {}),
    };

    let headers: Record<string, any> = {
      // 阻止瀏覽器探知檔案的 mime type
      "X-Content-Type-Options": "nosniff",
      // 對 same-origin 的 URL 正常送出 Referer，但不對 cross-origin 送出
      "Referrer-Policy": "same-origin",
      Authorization: "",
      ...(this.baseFetchOptions().headers ?? {}),
      ...(opt.headers ?? {}),
    };

    switch (opt.authorizationType) {
      case AuthorizationType.BearerJWT: {
        const jwt = await this.getJwtToken();

        headers = {
          ...headers,
          Authorization: `Bearer ${jwt}`,
        };
      }
    }

    switch (opt.contentType) {
      case ContentType.Json: {
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }
    }

    opt = {
      ...opt,
      headers: headers,
    };

    this.clearCache(opt);
    return opt;
  }

  protected clearCache(options?: FetchOptions) {
    if (options) {
      if (options.clearCache && options.key) {
        clearNuxtData(options.key);
      }
    }
  }

  private async useFetchWrapper<DataT>(
    url: Url,
    method: "get" | "post" | "patch" | "put" | "delete",
    options?: FetchOptions<DataT, T>
  ) {
    const { data, error, refresh, execute, status, pending } = await useFetch(
      url,
      {
        ...(await this.mergeFetchOptions(options)),
        method: method,
      }
    );
    const isSuccess = computed(() => status.value === "success");
    const isError = computed(() => status.value === "error");
    return { data, error, refresh, status, pending, isSuccess, isError };
  }

  protected async get<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, "get", options);
  }

  protected async post<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, "post", options);
  }

  protected async patch<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, "patch", options);
  }

  protected async put<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, "put", options);
  }

  protected async delete<DataT>(url: Url, options?: FetchOptions<DataT, T>) {
    return this.useFetchWrapper(url, "delete", options);
  }
}

export default BaseApi;
