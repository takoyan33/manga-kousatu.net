/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier', 'next'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    jest: true,
  },
  root: true,
  rules: {
    // '@next/next/no-img-element': 'warn',
    // '@next/next/no-page-custom-font': 'warn',
    // 使っていない変数を警告しない
    'no-unused-vars': 'warn',
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
    '@typescript-eslint/no-explicit-any': 'off',
    // 'react/jsx-key': [
    //   'warn',
    //   {
    //     checkFragmentShorthand: true,
    //     checkKeyMustBeforeSpread: true,
    //     warnOnDuplicates: true,
    //   },
    // ],
    // 'react/jsx-no-bind': [
    //   'warn',
    //   {
    //     allowArrowFunctions: true,
    //     allowBind: false,
    //     allowFunctions: false,
    //     ignoreDOMComponents: false,
    //     ignoreRefs: false,
    //   },
    // ],

    // console.log() などのconsole系メソッドの使用を警告 (デバッグが終わったら削除を促す)
    'no-console': 'warn',
    // debugger文の使用を禁止
    'no-debugger': 'error',
    // 三項演算子のネストを禁止 (可読性のため)
    'no-nested-ternary': 'warn',
    // 不必要な括弧を警告
    'no-extra-parens': 'warn',
    // オブジェクトのキーをクォートで囲む必要がない場合に警告
    'quote-props': ['warn', 'consistent-as-needed'],
    'sort-keys': ['warn', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    curly: ['warn'],
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
  },
}
