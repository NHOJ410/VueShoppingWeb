<script setup>
import { onMounted } from 'vue'
// 配置 Element Plus 的中文語言
import { ElConfigProvider } from 'element-plus'
import zhtw from 'element-plus/es/locale/lang/zh-tw'
// 導入圖標組件
import { Upload } from '@element-plus/icons-vue'

// 初始化 Google 翻譯小工具
// 此函數會在 Google 翻譯腳本加載完成後自動調用
window.googleTranslateElementInit = function() {
  new google.translate.TranslateElement({
    pageLanguage: 'zh-CN',      // 設置網頁原始語言為簡體中文
    includedLanguages: 'zh-TW', // 只包含繁體中文作為目標語言
    autoDisplay: false,         // 禁用自動顯示翻譯橫幅
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE  // 使用簡單布局
  }, 'google_translate_element')
}

// 自動觸發繁體中文翻譯的函數
const autoTranslate = () => {
  // 設置定時器檢查 Google 翻譯元素是否已加載
  const iframeCheckInterval = setInterval(() => {
    // 檢查 Google 翻譯 API 是否已加載完成
    if (window.google && window.google.translate) {
      clearInterval(iframeCheckInterval)  // 清除定時器
      const iframe = document.querySelector('.goog-te-menu-frame')
      if (iframe) {
        const translateLib = document.querySelector('.skiptranslate')
        if (translateLib) {
          translateLib.style.visibility = 'hidden'  // 隱藏翻譯工具欄

          // 設置 Cookie 以保存翻譯偏好
          document.cookie = 'googtrans=/zh-CN/zh-TW'
          location.reload()  // 重新加載頁面以應用翻譯
        }
      }
    }
  }, 500)  // 每 500 毫秒檢查一次
}

// 在組件掛載時執行的函數
onMounted(() => {
  // 獲取當前網站域名
  const host = window.location.hostname
  
  // 設置翻譯 Cookie，同時設置當前域名和根域名
  document.cookie = `googtrans=/zh-CN/zh-TW;domain=${host};path=/`
  document.cookie = `googtrans=/zh-CN/zh-TW;domain=.${host};path=/`

  // 動態創建並插入 Google 翻譯腳本
  const script = document.createElement('script')
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  document.body.appendChild(script)

  // 監聽頁面加載完成事件，確保翻譯選項被正確設置
  window.addEventListener('load', () => {
    const comboBox = document.querySelector('.goog-te-combo')
    if (comboBox) {
      comboBox.value = 'zh-TW'  // 設置下拉框值為繁體中文
      comboBox.dispatchEvent(new Event('change'))  // 觸發 change 事件
    }
  })
  
  // 調用自動翻譯函數
  autoTranslate()
})
</script>

<template>
  <div id="google_translate_element">
    <!-- 回到頂部按鈕 -->
    <el-backtop class="backToTop" :right="100" :bottom="50" :visibility-height="350">
      <template #default>
        <el-icon><Upload /></el-icon>
      </template> 
    </el-backtop>
    
    <!-- 路由出口 -->
    <el-config-provider :locale="zhtw">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style lang="scss" scoped>
// 回到頂部按鈕的樣式
.backToTop {
  width: 80px;
  height: 80px;
  font-size: 3rem;
  border-radius: 10px;
  color: $xtxColor;
  background-color: var(--el-bg-color-overlay);
  box-shadow: 0 0 10px rgba(39, 186, 155, 0.8); 
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }
}



</style>


