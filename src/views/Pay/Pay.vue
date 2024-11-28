797<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 導入api 
import { getOrderService } from '@/apis/pay' // 導入 獲取訂單詳情api
// 導入封裝的倒數計時函數
import { useCountDown } from '@/composables/useCountDown'
const { formatTime, start } = useCountDown()
// 定義路由
const route = useRoute()


// --------- 獲取訂單詳情數據 -----------
const payInfo = ref({}) // 存儲訂單詳情數據

const getOrderList = async () => {

  // 發送請求 獲取訂單詳情數據 ( 這裡記得要把我們獲取到的動態路由參數 [訂單id] 傳遞進去 )
  const res = await getOrderService(route.query.id)

  // 存儲訂單詳情數據
  payInfo.value = res.result
  // --------- 完成剩餘付款時間 -----------
  // 將封裝好的倒數計時函數裡面的屬性和方法解構出來
  // (1) formatTime 是在頁面中展示的倒數時間
  // (2) start 則是我們調用的倒數函數

  // 使用函數 將 後端傳遞過來的剩餘時間 導入進去
  start(res.result.countdown)

}
onMounted(() => getOrderList())


// --------- 支付方式分類 -----------
const payMethod = ref([
  // Visa
  { name: 'Visa',     title : 'Visa信用卡',  width: '150px', height: '50px' },
  // applePay
  { name: 'applePay', title : 'ApplePay',  width: '150px', height: '50px' },
  // googlePay
  { name: 'googlePay',title : 'GooglePay',  width: '150px', height: '48px' },
  // jkoPay
  { name: 'jkoPay',   title : '街口支付',  width: '150px', height: '48px' },
  // linePay
  { name: 'linePay',  title : 'LinePay',  width: '130px', height: '50px' },
])

const router = useRouter()

const indexNum = ref(0) // 紀錄點擊的 index

// 選擇付款方式的事件處理函數
const activeIndex = async (title , index) => {

  indexNum.value = index
  
  // 詢問用戶是否確認付款
  await ElMessageBox.confirm(
    `請問是否確認付款以「${title}」的方式付款？`,
    '溫馨提示',
    {
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      type: 'success',
    }
  )

  // 走到這裡 代表點擊確定 , 提示用戶 並跳轉回首頁

  ElMessage.success({
    message : '支付成功 ! 感謝您的購買 !',
    duration : 10000
  })

  router.replace('/')
}

</script>

<template>
  <!-- 支付頁面 -->
  <div class="pay-page" v-if="payInfo.id">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>訂單提交成功！請儘快完成支付。</p>
          <p>支付還剩 <span>{{ formatTime }}</span>，超時後將取消訂單</p>
        </div>
        <!-- 付款金額 -->
        <div class="amount">
          <span>應付金額：</span>
          <span>$ {{ payInfo.payMoney?.toFixed(0) }} 元</span>
        </div>
      </div>


      <!-- 付款方式分類 -->
      <div class="pay-type">
        <p>選擇以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <!-- 支付方式部分 -->
          <div class="payMethod" v-for="(item, index) in payMethod" :key="item.name" @click="activeIndex(item.title , index)"
            :class="{ active: indexNum === index }">
            <SVGItem :svgName="item.name" :width="item.width" :height="item.height"></SVGItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-page {
  margin-top: 20px;

  // 付款訊息部分
  .pay-info {
    background: #fff;
    display: flex;
    align-items: center;
    height: 240px;
    padding: 0 80px;

    // 確認圖標
    .icon {
      font-size: 80px;
      color: #1dc779;
    }

    // 付款成功提示訊息
    .tip {
      padding-left: 10px;
      flex: 1;

      p {

        // 訂單提交成功提示
        &:first-child {
          font-size: 20px;
          margin-bottom: 5px;
        }

        // 訂單剩餘時間倒數計時
        &:last-child {
          color: #999;
          font-size: 16px;
        }
      }
    }

    // 付款金額
    .amount {
      span {

        &:first-child {
          font-size: 16px;
          color: #999;
        }

        // 金額
        &:last-child {
          color: $priceColor;
          font-size: 20px;
        }
      }
    }
  }


}



// 付款方式分類
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  // 標題文字部分
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;


  }

  // 支付方式部分
  .payMethod {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    cursor: pointer;

    // 選中效果
    &.active,
    &:hover {
      border-color: $xtxColor;
    }

  }


}
</style>