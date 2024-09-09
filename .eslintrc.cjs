/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 重置ESLint組件名規則
  reles : {
    'vue/multi-word-component-names': 0
  }
}
