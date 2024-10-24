<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
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

</script>

<template>
  <div class="xtx-pay-page" v-if="payInfo.id">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>訂單提交成功！請儘快完成支付。</p>
          <p>支付還剩 <span>{{ formatTime }}</span>，超時後將取消訂單</p>
        </div>
        <div class="amount">
          <span>應付總額：</span>
          <span>${{ payInfo.payMoney?.toFixed(0) }}元</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">選擇以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <!-- visa支付 -->
          <a class="btn visa" href="javascript:;"></a>
          <!-- googlePay支付 -->
          <a class="btn googlePay " href="javascript:;"></a>
          <!-- applePay支付 -->
          <a class="btn applePay " href="javascript:;"></a>
          <!-- 街口支付 -->
          <a class="btn jkosPay " href="javascript:;"></a>
          <!-- linePay支付 -->
          <a class="btn linePay " href="javascript:;"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
  margin-top: 20px;
}

.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  // 禁止點擊狀態 ( 因為目前項目只有支付寶可以使用 , 所以讓其他的支付功能都不可點擊 )
  .disabled-link {
    cursor: not-allowed;
    color: gray; /* 改變文字顏色以表示不可點擊 */
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $xtxColor;
    }
    // VISA支付
    &.visa {
      background: url(https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/277770498_5514767655256218_5269868613118422637_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WPvXoH2vjCoQ7kNvgHNt28k&_nc_ht=scontent.ftpe3-2.fna&_nc_gid=A4YWOb0vFj1qjrT--AZQt8t&oh=00_AYAEgJQdYmQsYCPjIZRyHsygCoB6Dv1ZyBbCtifqZxbdBg&oe=66F199D3)
        no-repeat center / contain;
    } 
    // googlePay支付
    &.googlePay {
      background: url(https://lh3.googleusercontent.com/TSg57YyU7L-oI8rFmWzS7o44jCv7jEEP923UozbVhBy25sRy_hf3BNzcKWkdJxMK_wwvwgESef0yoe9OBuyVBFCRdxYjfaflOy9Y-Ls)
        no-repeat center / contain;
    }
    // applePay支付
    &.applePay {
      background: url(https://www.apple.com/v/apple-pay/k/images/overview/og__dq5nejr4bg02_image.png?202311152024)
      no-repeat center / contain;
    }
    // 街口支付
    &.jkosPay {
      background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqF1E3-owrezZM2T7KNHz2TIiLoQQF8zVzDg&s)
      no-repeat center / contain;
    }
    // LinePay支付
    &.linePay {
      background: url(https://timgm.eprice.com.tw/tw/mobile/img/2018-09/08/5127108/fsu2913_1_babc65f86a710b4f1097172a4542193f.jpg)
      no-repeat center / contain;
    }
  }
  
  
}
</style>  