import { createApp } from 'vue'
import pinia from '@/stores/index.js' // 導入 pinia
import App from './App.vue'
import router from './router'
import '@/styles/common.scss' // css重置樣式
import { lazyImg } from './directives/index.js' // 導入自定義圖片懶加載指令檔案
import { globalComponents } from '@/components/index.js' // 全局組件註冊
import 'virtual:svg-icons-register' // 導入 svg圖標插件

// 導入 animate.css
import 'animate.css'
import 'animate.css/animate.compat.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyImg)
app.use(globalComponents)

app.mount('#app')




