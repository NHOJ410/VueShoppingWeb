  <script setup>

defineProps({
  detailData : {
    type : Object
  }
})

</script>

<template>
  <div class="box">
  <!-- 商品訊息部分 -->
  <!-- 商品標題 -->
  <p class="g-name">{{ detailData.name }}</p>
  <!-- 商品描述 -->
  <p class="g-desc">{{ detailData.desc }}</p>
  <!-- 商品價格 -->
  <p class="g-price">
    <!-- 商品價格 - 打折後 -->
    <span class="price">售價 : ${{ detailData.price }}</span>
    <!-- 商品價格 - 打折前 -->
    <span class="oldPrice">{{ detailData.oldPrice }}</span>
  </p>
  
  <!-- 底部描述部分 -->
  <div class="g-service">
    <dl>
      <dt>促銷</dt>
      <dd>12月好物放送，App領券購買直降120元</dd>
    </dl>
    <dl>
      <dt>服務</dt>
      <dd>
        <span>無憂退貨</span>
        <span>快速退款</span>
        <span>免費包郵</span>
        <a href="#">了解詳情</a>
      </dd>
    </dl>
  </div>
</div>
</template>

<style lang="scss" scoped>
.box {

  // 商品標題
.g-name {
    font-size: 22px;
  }
  
  // 商品描述
  .g-desc {
    color: #999;
    margin-top: 10px;
  }
  
  // 商品價格 ( 包含打折前 和 打折後 )
  .g-price {
    margin-top: 10px;
    
    span {
      
      // 當前價格「打折後」
      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }
      
      // 原本價格「打折前」
      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }
   

  // 底部描述部分
  .g-service {
    background: #f5f5f5;
    width: 600px;
    padding: 20px 20px 0 40px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: " • ";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

}

</style>