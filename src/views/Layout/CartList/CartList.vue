<script setup>
// 導入組件
import CartListData from './components/CartListData.vue' // 導入購物車內容組件
// 導入圖標
import { CircleCheckFilled } from '@element-plus/icons-vue'

// 導入 vuerouter
import { useRouter } from 'vue-router'
const router = useRouter()

// 導入 Pinia倉庫
import { useCartStore } from '@/stores' // 導入購物車倉庫

// 定義購物車倉庫
const cartStore = useCartStore()



// --------- 下單結算的事件處理函數 ------------

const payOrder = async () => {

  // 先詢問用戶是否確認下單
  await ElMessageBox.confirm(
    '是否確認要購買這些商品',
    '',
    {
      confirmButtonText: '是的 去買單',
      cancelButtonText: '我再想想',
      type: 'warning',
    }
  )

  // 用戶點擊確認的話  跳轉到結算頁面
  router.push('/Settlement')
}



</script>

<template>
  <div class="cart-page">
    <div class="container m-top-20">
      <!-- 購物車清單部分 -->
      <div class="cart">
        <CartListData></CartListData>
      </div>
      
      <!-- 底部統計區域 -->
      <div class="action" v-if="cartStore.cartList.length !== 0">
        <div class="batch">
          <!-- 計算 總數量 , 選中商品總數量 區域 -->
          共 {{ cartStore.totalCount }} 件商品，已選擇 {{ cartStore.selectCount }} 件，商品合計：
          <!-- 計算總價格區域 -->
          <span class="totalPrice">$ {{ cartStore.selectPrice.toFixed(0) }} 元</span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" :icon="CircleCheckFilled" @click="payOrder">下單結算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.cart-page {
  margin-top: 20px;

  // 購物車列表部分
  .cart {
    background: #fff;
    color: #666;
   
  }

  // 底部統計區域
  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 18px;
    justify-content: space-between;
    padding: 0 30px;

    .totalPrice {
      font-size: 24px;
      margin-right: 20px;
      font-weight: bold;
      color: $priceColor;
    }
  }
}
</style>