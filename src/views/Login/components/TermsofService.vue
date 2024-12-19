<script setup>
import { ref } from 'vue' 
import { Message, Link } from '@element-plus/icons-vue'

const isShowService = ref(false) // 是否顯示服務條款

const onShow = () => {
  isShowService.value = true
}

const onClose = () => {
  isShowService.value = false
}

// 使用defineExpose 將 onShow暴露出去
defineExpose({
  onShow
})



</script>

<template>
  <div class="terms-container">
    <el-dialog 
      v-model="isShowService"
      width="800px"
      class="terms-dialog"
    >
      <!-- 頂部標題部分 -->
      <template #header>
        <h3 class="terms-title">服務條款與隱私政策</h3>
      </template>

      <!-- 中間條款內容部分 -->
      <template #default>
        <div class="terms-content">
          <dl>
            <dt>一、我們在您使用網站時可能會收集以下資料：</dt>
            <dd>
              <ul>
                <li></li>
                <li>您提供的個人資訊，如姓名、電子郵件、聯絡方式等</li>
              <li>您的購買歷史和瀏覽記錄</li>
                <li>使用網站的行為資料（如 IP 位址、裝置資訊）。</li>
              </ul>
            </dd>

            <dt>二、我們會將收集的資料用於以下用途：</dt>
            <dd>
            <ul>
              <li>處理您的訂單和付款</li>
              <li>優化購物體驗，提供個性化推薦</li>
              <li>與您聯繫，回應您的問題或客戶服務需求</li>
            </ul>
            </dd>
            
            <dt>三、資料保護</dt>
            <dd>
              <ul>
                <li>我們將採取合理的技術和管理措施，確保您的個人資料安全，防止未經授權的訪問、修改或洩露。</li>
              </ul>
            </dd>

            <dt>四、資料分享</dt>
            <dd>
              <ul>
                <li>除非取得您的明確同意，我們不會將您的個人資料分享給第三方，除非是為了法律合規、支付處理或合作夥伴的正常運作。</li>
              </ul>
            </dd>

            <dt>五、您的權利</dt>
            <dd>
              <ul>
                <li>您有權查詢、更正、或請求刪除您的個人資料。如需行使這些權利，請與我們聯繫。</li>
              </ul>
            </dd>

            <dt>六、隱私條款變更</dt>
            <dd>
              <ul>
                <li>我們可能會根據需要更新隱私條款。任何變更將會發布在此頁面，並注明更新日期。</li>
              </ul>
            </dd>
          </dl>
          
          <!-- 底部聯繫區域 -->
          <div class="contact-section">
            <p class="contact-title">如需協助，請聯繫我們</p>
            <div class="contact-info">
              <a href="mailto:ae411253@gmail.com" class="contact-link">
                <el-icon><Message /></el-icon>
                ae411253@gmail.com
              </a>
              <a href="https://github.com/NHOJ410/VueShoppingWeb/tree/main" 
                 target="_blank" 
                 class="contact-link"
              >
                <el-icon><Link /></el-icon>
                GitHub 連結
              </a>
            </div>
          </div>
        </div>
      </template>

      <!-- 底部確認按鈕部分 -->
      <template #footer>
        <el-button type="primary" class="confirm-button" @click="onClose">
          我同意並接受服務條款
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.terms-container {
  letter-spacing: 2px;
  // 對話框基本樣式設定
  .terms-dialog {
    :deep(.el-dialog__body) {
      padding: 30px;
    }
  }

  // 標題樣式
  .terms-title {
    font-size: $thirdFontSize;
    font-weight: 600;
    text-align: center;
    color: $mainColor;
    margin: 0;
  }

  // 內容區域樣式
  .terms-content {
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 10px;

    // 條款列表樣式
    dl {
      margin: 0;
      padding: 0;

      // 條款標題樣式
      dt {
        font-size: $smallFontSize;
        font-weight: 600;
        color: $mainColor;
        margin: 24px 0 12px;
        
        &:first-child {
          margin-top: 0;
        }
      }

      // 條款內容樣式
      dd {
        font-size: $miniFontSize;
        line-height: 1.6;
        color: #666;
        margin: 0 0 16px;

        // 條款內容列表樣式
        ul {
          padding-left: 20px;
          
          li {
            margin: 8px 0;
          }
        }
      }
    }
  }

  // 聯繫方式區域樣式
  .contact-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #eee;

    // 聯繫方式標題
    .contact-title {
      font-size: $smallFontSize;
      font-weight: 600;
      color: $mainColor;
      margin-bottom: 16px;
    }

    // 聯繫方式資訊容器
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    // 聯繫方式連結樣式
    .contact-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: $mainColor;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: darken($mainColor, 10%);
      }

      // 圖示樣式
      .el-icon {
        font-size: $smallFontSize;
      }
    }
  }

  // 確認按鈕樣式
  .confirm-button {
    width: 100%;
    height: 44px;
    font-size: $miniFontSize;
    font-weight: 500;
  }
}
</style>