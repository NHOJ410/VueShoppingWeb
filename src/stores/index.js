import { createPinia } from 'pinia'


const pinia = createPinia()


export default pinia

// 統一導出 Pinia 倉庫
export * from '@/stores/modules/category.js'
export * from '@/stores/modules/user.js'