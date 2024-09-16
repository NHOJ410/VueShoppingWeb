import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 引入Pinia持久化插件

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia

// 統一導出 Pinia 倉庫
export * from '@/stores/modules/category.js'
export * from '@/stores/modules/user.js'
export * from '@/stores/modules/cartStore.js'
