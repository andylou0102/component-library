module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@frontend-config/eslint-config-vue3',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-unregistered-components': [
      'error',
      {
        ignorePatterns: [],
      },
    ],
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['scripts/**/*.*'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
