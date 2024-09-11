<script setup>

// 使用 defineProps接收父組件傳遞來的數據
defineProps({
  good : {
    type : Object || Array,
    default : () => {}
  }
})

</script>

<template>
  <!-- 右側商品列表 -->
  <RouterLink to="/" class="goods-item">
    <img v-lazyLoading="good.picture" alt="" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">${{ good.price }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
  // 商品列表樣式
    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;
      // 經過時的動畫 hover效果
      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }
      img {
        width: 160px;
        height: 160px;
      }
      p {
        padding-top: 10px;
      }
      // 一級標題
      .name {
        font-size: 16px;
      }
      // 二級標題
      .desc {
        color: #999;
        height: 29px;
      }
      // 價格
      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
</style>