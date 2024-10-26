<script setup>
// 接收父組件傳遞過來的 isShowService
defineProps({
  isShowService : {
    type : Boolean,
    default : false
  }
})

// 點擊確認按鈕後 回傳給父組件 通知關閉

// 創建 emit事件
const emit = defineEmits(['update:isShowService'])

// 點擊關閉按鈕時 通知父組件 將 isShowService 的狀態改回false
const close = () => {
  emit('update:isShowService', false)
}


</script>

<template>
  <div class="box">
  <!-- 服務條款部分 -->
  <el-dialog title="title" width="1000px" :model-value="isShowService" @update:model-value="value => emit('update:isShowService', value)">
      <!-- 頂部標題部分 -->
       <template #header>
        <h3>Vue購物商城 服務條款</h3>
       </template>
       <!-- 中間條款內容部分 -->
       <template #default>
         <dl>
          <dt>一、資料收集</dt>
          <dd>
            <ul>我們在您使用網站時可能會收集以下資料：</ul>
            <li>您提供的個人資訊，如姓名、電子郵件、聯絡方式等</li>
            <li>您的購買歷史和瀏覽記錄</li>
            <li>使用網站的行為資料（如 IP 位址、裝置資訊）。</li>
          </dd>

          <dt>二、資料使用</dt>
          <dd>
            <ul>我們會將收集的資料用於以下用途：</ul>
            <li>處理您的訂單和付款</li>
            <li>優化購物體驗，提供個性化推薦</li>
            <li>與您聯繫，回應您的問題或客戶服務需求</li>
          </dd>
          
          <dt>三、資料保護</dt>
          <dd>我們將採取合理的技術和管理措施，確保您的個人資料安全，防止未經授權的訪問、修改或洩露。</dd>

          <dt>四、資料分享</dt>
          <dd>除非取得您的明確同意，我們不會將您的個人資料分享給第三方，除非是為了法律合規、支付處理或合作夥伴的正常運作。</dd>

          <dt>五、您的權利</dt>
          <dd>您有權查詢、更正、或請求刪除您的個人資料。如需行使這些權利，請與我們聯繫。</dd>

          <dt>六、隱私條款變更</dt>
          <dd>我們可能會根據需要更新隱私條款。任何變更將會發布在此頁面，並注明更新日期。</dd>
         </dl>
         <strong>如果還有疑慮 請聯繫我們 信箱地址 : <a href="mailto:ae411253@gmail.com">ae411253@gmail.com</a></strong>
       </template>
       <!-- 底部確認按鈕部分 -->
        <template #footer>
          <el-button type="primary" @click="close">我知道了</el-button>
        </template>
     </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
  .box {
    // 頂部大標題
    h3 {
    font-size: 30px;
    text-align: center;
    color : #3fb984;
   }

   dl {
    margin-bottom: 30px;
   }

    // 每項條款的標題
    dt {
      font-size: 20px;
      color : #3367d6;
    }

    // 條款內容
    dd {
      font-size: 16px;
      line-height: 2;
    }

    strong {
      font-size: 18px;
      
      a {
        color : red;
      }
    }


}
</style>