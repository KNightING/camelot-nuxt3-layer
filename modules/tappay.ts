import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  hooks: {
    // "prepare:types": ({ tsConfig, references }) => {
    //   tsConfig.compilerOptions ||= {};
    //   tsConfig.compilerOptions.types ||= [];
    //   tsConfig.compilerOptions!.types.push("@types/tpdirect");
    //   references.push({
    //     types: "@types/tpdirect",
    //   });
    // },
  },
  setup(options, nuxt) {
    nuxt.options.app.head.script = [
      ...(nuxt.options.app.head.script ?? []),
      {
        src: 'https://js.tappaysdk.com/sdk/tpdirect/v5.17.0'
      },
      {
        src: 'https://pay.google.com/gp/p/js/pay.js'
      }
    ]
  }
})
