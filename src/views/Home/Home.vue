<script setup>
// 導入組件
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeNews from '@/views/Home/components/HomeNews.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'

// 導入 hooks
import { useWowPlugin } from '@/composables/useWowPlugin.js' // wow.js插件

// wow.js插件效果
useWowPlugin()

</script>

<template>
  <!-- 上方商品菜單和輪播圖 -->
  <div class="container wow rubberBand">
    <div class="category">
      <HomeCategory></HomeCategory>
      <HomeBanner></HomeBanner>
    </div>
    <!-- 新鮮好物區域 -->
    <HomeNews></HomeNews>
    <!-- 熱門品牌區域 -->
    <HomeHot></HomeHot>
    <!-- 商品列表區域 -->
    <HomeProduct></HomeProduct>
  </div>


</template>

<style lang="scss" scoped>
.container {
  
  .category {
    margin-top: 20px;
  }
}

</style>