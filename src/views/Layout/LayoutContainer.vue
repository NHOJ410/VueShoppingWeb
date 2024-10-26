<script setup>
// 導入 Pinia倉庫
import { useCategoryStore } from '@/stores' // 導入商品分類倉庫
// 導入組件
import LayoutHeader from './components/LayoutHeader.vue'; // 頭部組件
import LayoutNav from './components/LayoutNav.vue'; // 頭部商品導航組件
import LayoutNavFixed from './components/LayoutNavFixed.vue'; // 頭部商品導航吸頂效果組件
import LayoutFooter from './components/LayoutFooter.vue'; // 底部組件

// 調用方法 獲取頭部商品導航列表
const categoryStore = useCategoryStore() // 定義商品分類倉庫
categoryStore.getCategory() // 調用 商品分類倉庫 獲取數據

</script>

<template>
  <!-- 頭部組件 -->
  <LayoutHeader></LayoutHeader>
  <!-- 頭部導航組件 -->
  <LayoutNav></LayoutNav>
  <!-- 頭部商品導航吸頂效果組件 -->
  <LayoutNavFixed></LayoutNavFixed>
  <!-- 二級路由出口 -->
  <router-view></router-view>
  <!-- 底部組件 -->
  <LayoutFooter></LayoutFooter>
</template>

<style lang="scss" scoped>
 

</style>