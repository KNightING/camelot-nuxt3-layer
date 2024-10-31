# use this theme

## Basic

in `package.json`

```json
 "devDependencies": {
    "@iconify-json/material-symbols": "^1.1.62",
    "@nuxt/eslint-config": "^0.6.1",
    "@nuxtjs/i18n": "8.5.5",
    "@nuxtjs/tailwindcss": "^6.10.4",
    "@pinia-plugin-persistedstate/nuxt": "^1.2.0",
    "@vueuse/core": "^11.2.0",
    "@vueuse/nuxt": "^11.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^9.13.0",
    "nuxt": "^3.13.2",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.3.3",
    "unplugin-icons": "^0.20.0",
    "unplugin-vue-components": "^0.27.4",
    "vue": "^3.4.0",
    "vue-router": "^4.2.5"
  },
  "dependencies": {
    "@pinia/nuxt": "^0.5.1",
    "@vueuse/components": "^10.6.0",
    "@vueuse/integrations": "^10.6.0",
    "change-case": "^4.1.2"
  }
```

in `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ...
  extends: [
      "github:KNightING/camelot-nuxt3-layer", // GitHub Remote Source
  ],
});
```

## TailwindCSS

1. copy `tailwind.config.js` to root folder
2. copy `assets` folder to root folder
3. in `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ...
  css: [
    "@/assets/css/global.css",
    "@/assets/css/tailwind-base.css",
    "@/assets/css/tailwind-components.css",
    "@/assets/css/tailwind-utilities.css",
  ],});
```

## i18n

1. in `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ...
  i18n: {
    locales: [
      {
        name: "English",
        code: "en-us",
        file: "en-us.json",
      },
      {
        name: "正體中文",
        code: "zh-tw",
        file: "zh-tw.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "zh-tw",

    // lang路由 https://v8.i18n.nuxtjs.org/options/routing#strategy
    strategy: "no_prefix",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      cookieCrossOrigin: true,
      cookieSecure: true,
      redirectOn: "root", // recommended
    },
    vueI18n: "./i18n.config.ts",
  },
})
```

   2. copy `lang` folder and `i18n.config.ts` to root folder


## Drop Code

Build with drop code

drop `console` and `debugger` or some code.

just add `--drop-code` to command like:

not working on `nuxt dev`

```bash
pnpm generate --drop-code
```

if what to drop some code then write `DEV` label with target function like:

```js
function example() {
  DEV: doAnExpensiveCheck()
  return normalCodePath()
}
```

then will become to

```js
function example() {
  return normalCodePath();
}
```

more in [ESBuild](https://esbuild.github.io/api/#drop-labels)
