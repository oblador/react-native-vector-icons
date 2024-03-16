module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'airbnb'],
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.js', '*.tsx', '*.jsx'],
      extends: ['biome'],
    },
    {
      files: ['.eslintrc.{js,cjs}'],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: '*.test.tsx',
      env: {
        jest: true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': ['error', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'always' }],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    // Prefer the typescript unsed vars rule
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/prefer-default-export': 'off',
    // 'react/static-property-placement': 0,
    // 'react/state-in-constructor': 0,
    // 'import/no-extraneous-dependencies': 0,
    // 'import/no-unresolved': [2, { ignore: ['^react(-native)?$'] }],
  },
};
