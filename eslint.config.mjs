
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules:{
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      // Note: you must disable the base rule as it can report incorrect errors
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'func-call-spacing': 'off',
      'require-await': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off'
    }
  }
)
