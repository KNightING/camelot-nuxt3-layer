import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import {
  NaiveUiResolver,
  VueUseComponentsResolver
} from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

const osPlatform = process.platform
let isWindows = false
let isMac = false
let isLinux = false

if (osPlatform === 'darwin') {
  isMac = true
} else if (osPlatform === 'win32') {
  isWindows = true
} else if (osPlatform === 'linux') {
  isLinux = true
}

function getArgvBoolean(key: string, defaultValue = false): boolean {
  const index = process.argv.findIndex((value) => {
    return value.startsWith(key)
  })

  if (index >= 0) {
    const arg = process.argv[index]
    const [key, value] = arg.split('=')
    if (value === 'true' || value === '1') {
      return true
    } else {
      return false
    }
  }
  return defaultValue
}

const dropCode = getArgvBoolean('--drop-code')

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: '/',

    head: {
      meta: [
        {
          name: 'viewport',
          content: 'initial-scale=1, viewport-fit=cover'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      version: '1.0.0',
      env: 'development'
    }
  },

  css: [
    // join(currentDir, "/assets/css/global.css"),
    join(currentDir, '/assets/css/tailwind-base.css'),
    join(currentDir, '/assets/css/tailwind-components.css'),
    join(currentDir, '/assets/css/tailwind-utilities.css')
    // "@/assets/css/global.css",
    // "@/assets/css/tailwind-base.css",
    // "@/assets/css/tailwind-components.css",
    // "@/assets/css/tailwind-utilities.css",
  ],

  vite: {
    plugins: [
      Components({
        resolvers: [
          NaiveUiResolver(),
          VueUseComponentsResolver(),
          IconsResolver()
        ]
      }),
      Icons({ autoInstall: true })
    ],
    esbuild: {
      drop: dropCode
        ? ['console', 'debugger']
        : [],
      dropLabels: dropCode
        ? ['DEV']
        : []
    },
    optimizeDeps: {
      exclude: isMac ? ['fsevents'] : []
    }
  },

  nitro: {
    esbuild: {
      options: {
        drop: ['console']
      }
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: [
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          'acceptHMRUpdate',
          'definePiniaStore',
          'storeToRefs'
        ]
      }
    ],
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    'unplugin-icons/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  experimental: {
    renderJsonPayloads: false
  },

  imports: {
    dirs: [
      // scan all modules within given directory
      'composables/**',
      'types/**'
    ]
  },

  tailwindcss: {
    viewer: false
  },

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en-us',
        file: 'en-us.json'
      },
      {
        name: '正體中文',
        code: 'zh-tw',
        file: 'zh-tw.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'zh-tw',

    // lang路由 https://v8.i18n.nuxtjs.org/options/routing#strategy
    strategy: 'no_prefix',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: true,
      cookieSecure: true,
      redirectOn: 'root' // recommended
    },
    vueI18n: './i18n.config.ts'
  }
})
