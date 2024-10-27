<script setup>

// 接收父組件傳遞過來的商品數據
defineProps({

  // 訂單數據
  orderData :{
    type : Object,
    default : () => ({})
  }
})

</script>

<template>
  <div class="box">
    <!-- 底部統計區域 -->
    <div class="total">
      <dl>
        <dt>商品件數：</dt>
        <dd>{{ orderData.summary?.goodsCount }} 件</dd>
      </dl>
      <dl>
        <dt>商品總價：</dt>
        <dd>${{ orderData.summary?.totalPrice.toFixed(0) }} 元</dd>
      </dl>
      <dl>
        <dt>運 費 : </dt>
        <dd>${{ orderData.summary?.postFee.toFixed(0) }} 元</dd>
      </dl>
      <dl>
        <dt>應付總額：</dt>
        <dd class="price">{{ orderData.summary?.totalPayPrice.toFixed(0) }} 元</dd>
      </dl>
    </div>
    
    <!-- Pinia SVG圖標 裝飾用 -->
    <SVGItem :svgName="'Pinia'" width="300px" height="250px"></SVGItem>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .total {
  padding-left: 10px;
  
  dl {
    display: flex;
    justify-content: flex-start;
    line-height: 80px;
    
    // 標題名稱
     dt {
      width: 100px;
      text-align: left;
      font-size: 18px;
    }
    
    // 資料名稱
    dd {
      font-size: 16px;
    }
    
    // 總金額樣式
    .price {
      color: $priceColor;
    }

  }
}
}
</style>