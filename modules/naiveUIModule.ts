import {
  defineNuxtModule

} from '@nuxt/kit'
// import {
//   defineNuxtModule,
//   addPlugin,
//   createResolver,
//   addImportsSources,
//   addImports,
//   addComponent,
//   extendViteConfig
// } from '@nuxt/kit'
// import naive from 'naive-ui'

// // Module options TypeScript interface definition
// export interface ModuleOptions {}

// export default defineNuxtModule<ModuleOptions>({
//   // Default configuration options of the Nuxt module
//   defaults: {},
//   // Add types for volar
//   hooks: {
//     'prepare:types': ({ tsConfig, references }) => {
//       tsConfig.compilerOptions ||= {}
//       tsConfig.compilerOptions.types ||= []
//       tsConfig.compilerOptions!.types.push('naive-ui/volar')
//       references.push({
//         types: 'naive-ui/volar'
//       })
//     }
//   },
//   setup(options, nuxt) {
//     const libName = 'naive-ui'
//     const resolver = createResolver(import.meta.url)

//     // Add imports for naive-ui components
//     const naiveComponents = Object.keys(naive).filter(name =>
//       /^(N[A-Z]|n-[a-z])/.test(name)
//     )

//     naiveComponents.forEach((name) => {
//       addComponent({
//         export: name,
//         name,
//         filePath: libName
//       })
//     })

//     const naiveComposables = [
//       'useDialog',
//       'useMessage',
//       'useNotification',
//       'useLoadingBar',
//       'useDialogReactiveList'
//     ]

//     // nuxt.options.imports.autoImport !== false &&
//     //   addImportsSources({
//     //     from: libName,
//     //     imports: [...naiveComposables],
//     //   });

//     naiveComposables.forEach((name) => {
//       addImports({
//         name,
//         as: name,
//         from: libName
//       })
//     })

//     if (process.env.NODE_ENV === 'production') {
//       nuxt.options.build.transpile.push(
//         'naive-ui',
//         'vueuc',
//         '@css-render/vue3-ssr',
//         '@juggle/resize-observer'
//       )
//     } else {
//       nuxt.options.build.transpile.push('@juggle/resize-observer')

//       extendViteConfig((config) => {
//         config.optimizeDeps = config.optimizeDeps || {}
//         config.optimizeDeps.include = config.optimizeDeps.include || []
//         config.optimizeDeps.include.push(
//           'naive-ui',
//           'vueuc'
//         )
//       })
//     }

//     // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
//     // addPlugin(resolver.resolve('./runtime/plugin'))
//   }
// })

export default defineNuxtModule({
  setup(options, nuxt) {
    const config = nuxt.options.runtimeConfig
    // nuxt.options.app.head.link = [
    //   ...(nuxt.options.app.head.link ?? []),
    //   {
    //     rel: "icon",
    //     type: "image/x-icon",
    //     href: `${config.app.baseURL}favicon.ico?v=${config.public.version}`,
    //   },
    // ];
  }
})
