<script setup>
import { onMounted } from 'vue'
import { Van } from '@element-plus/icons-vue'
// 導入組件
import UserAddress from './components/UserAddress.vue'; // 導入 收貨地址組件
import ProductList from './components/ProductList.vue'; // 導入 商品清單組件
import TotalPrice from './components/TotalPrice.vue'; // 導入 結算金額組件
// 導入倉庫
import { storeToRefs } from 'pinia';
import { usePayOrderStore } from '@/stores' // 導入 購物車 , 訂單結算倉庫
// 定義倉庫
const payOrderStore = usePayOrderStore() // 定義 訂單結算倉庫

// 使用 storeToRefs宏將 訂單倉庫的數據 解構出來
const { orderData } = storeToRefs(payOrderStore)


// 調用請求 獲取訂單詳情數據 ( 因為涉及到 DOM操作 所以在 onMounted裡面調用 )
onMounted(() => {
  payOrderStore.getSettlement()
})


</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收貨地址區域-->
        <h3 class="box-title">收貨地址</h3>
        <UserAddress></UserAddress>

        <!-- 結算商品清單部分 -->
        <h3 class="box-title">結算商品清單</h3>
        <ProductList :orderData="orderData"></ProductList>

        <!-- 結算金額部分 -->
        <h3 class="box-title">結算金額</h3>
        <TotalPrice :orderData="orderData"></TotalPrice>

        <!-- 提交訂單部分 -->
        <div class="submit">
          <!-- VueUse圖標 裝飾用 -->
          <SVGItem :svgName="'VueUse'" width="200px" height="200px"></SVGItem>
          <!-- 提交訂單按鈕 -->
          <el-button type="primary" class="btn" :icon="Van" @click="payOrderStore.onSubmitOrder()">提交訂單</el-button>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;
  
  // 內容區部分
  .wrapper {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
    padding: 0 20px;
    
    // 內容區標題
    .box-title {
      font-size: 25px;
      font-weight: normal;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
      padding: 20px 0;
      text-align: center
    }
  }

  // 提交訂單部分
  .submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
    
    // 提交訂單按鈕
    .btn {
      width: 200px;
      height: 100px;
      font-size: 30px;
    }
  }
}
</style>