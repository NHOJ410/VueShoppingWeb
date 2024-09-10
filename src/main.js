import { createApp } from 'vue'
import pinia from '@/stores/index.js' // 導入 pinia
import App from './App.vue'
import router from './router'
import '@/styles/common.scss' // css重置樣式
import { lazyImg } from './directives/index.js' // 導入自定義指令檔案

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyImg)

app.mount('#app')




