<script setup>
// 導入組件
import HomeCategory from '@/views/Layout/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Layout/Home/components/HomeBanner.vue'
import HomeNews from '@/views/Layout/Home/components/HomeNews.vue'
import HomeHot from '@/views/Layout/Home/components/HomeHot.vue'
import HomeProduct from '@/views/Layout/Home/components/HomeProduct.vue'
</script>

<template>

  <!-- 上方商品菜單和輪播圖 -->
  <div class="container">
   <HomeCategory></HomeCategory>
   <HomeBanner></HomeBanner>
  </div>
  <!-- 新鮮好物區域 -->
  <HomeNews></HomeNews>
  <!-- 熱門品牌區域 -->
  <HomeHot></HomeHot>
  <!-- 產品列表區域 -->
  <HomeProduct></HomeProduct>
</template>