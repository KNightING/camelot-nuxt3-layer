import type { CookieOptions, CookieRef } from "nuxt/app";

class CookieProxy<T> {
  private _cookie: CookieRef<T>;

  constructor(key: string, opts?: CookieOptions<T>) {
    this._cookie = useCookie<T>(key, opts);
  }

  get cookie(): CookieRef<T | undefined> {
    return this._cookie;
  }

  get value(): T | undefined {
    return this.cookie.value;
  }

  set value(val: T) {
    this.cookie.value = val;
  }

  public patch = (newValue: T) => {
    this.cookie.value = { ...this.cookie.value, ...newValue };
  };

  public del = () => {
    this.cookie.value = undefined;
  };
}

export const useCookieProxy = <T>(key: string, opts?: CookieOptions<T>) =>
  new CookieProxy(key, opts);
