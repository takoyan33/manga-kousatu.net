/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true,
}
