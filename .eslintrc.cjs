/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true, // 新增 node 環境支持
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 重置ESLint組件名規則
  rules : {
    'vue/multi-word-component-names': 0,
    'no-undef': 'off', // 或者僅關閉此規則
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
  },
}
