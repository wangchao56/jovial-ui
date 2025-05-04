import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'ts/no-duplicate-enum-values': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'max-statements-per-line': 'off',
  },
  ignores: [
    'src/utils/helpers.ts',
    '**/*.md',
  ],
})
