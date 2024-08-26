/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    jest: true,
  },
  root: true,
  rules: {
    // 使っていない変数を警告しない
    'no-unused-vars': 'off',
    // ReactHookのルールを無効化
    'react-hooks/rules-of-hooks': 'off',
    // インポート文の順序を統一
    'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
    // 再代入しない変数には const を使用するように促す
    'prefer-const': 'error',
    //  target="_blank" 属性の使用を禁止
    'react/jsx-no-target-blank': 'error',
    // 使用されていない式を警告
    'no-unused-expressions': 'warn',
    // varの使用を禁止
    'no-var': 'error',
    //useEffectやuseCallback などのカスタムフックの依存配列に関するルールを有効
    'react-hooks/exhaustive-deps': 'warn',
    // Props の型チェックを行う
    'react/prop-types': 'warn',
    // any型の使用を制限
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}
