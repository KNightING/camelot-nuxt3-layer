# use this theme

## Basic

in `package.json`

```json
 "devDependencies": {
    "@nuxt/eslint": "^0.6.1",
    "@nuxtjs/i18n": "9.0.0",
    "@nuxtjs/tailwindcss": "^6.12.2",
    "pinia-plugin-persistedstate": "^4.1.3",
    "@vueuse/core": "^11.2.0",
    "@vueuse/nuxt": "^11.2.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.13.0",
    "nuxt": "3.14.159",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3",
    "unplugin-icons": "^0.20.1",
    "unplugin-vue-components": "^0.27.4",
    "vue": "^3.5.12",
    "vue-router": "^4.4.5"
  },
  "dependencies": {
    "@pinia/nuxt": "^0.7.0",
    "@vueuse/components": "^11.2.0",
    "@vueuse/integrations": "^11.2.0",
    "change-case": "^5.4.4"
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
