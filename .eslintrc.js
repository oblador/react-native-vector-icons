module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'airbnb'],
  env: {
    browser: true,
    es2021: true,
    jest: true,
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
      files: '*.test.js',
      env: {
        jest: true,
      },
      globals: {
        detox: false,
        device: false,
        expect: false,
        waitFor: false,
        element: false,
        by: false,
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
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'import/prefer-default-export': 'off',
    // Prefer the typescript unsed vars rule
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
