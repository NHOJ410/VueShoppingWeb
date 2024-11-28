import { createApp } from 'vue'
import pinia from '@/stores/index.js' // 導入 pinia
import App from './App.vue'
import router from './router'
import '@/styles/common.scss' // css重置樣式
import { lazyImg } from './directives/index.js' // 導入自定義圖片懶加載指令檔案
import 'virtual:svg-icons-register' // 導入 svg圖標插件

import ElementPlus from 'element-plus'
import zhtw from 'element-plus/es/locale/lang/zh-tw'



// 導入 animate.css
import 'animate.css'
import 'animate.css/animate.compat.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyImg)

app.use(ElementPlus, {
  locale: zhtw,
})

app.mount('#app')




