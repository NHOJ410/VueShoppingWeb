<script setup>
// 導入組件
import LayoutHeader from './components/LayoutHeader.vue'; // 頭部組件
import LayoutNav from './components/LayoutNav.vue'; // 導航組件
import LayoutFooter from './components/LayoutFooter.vue'; // 底部組件

</script>

<template>
  <LayoutHeader></LayoutHeader>
  <LayoutNav></LayoutNav>
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>

<style lang="scss" scoped>
 

</style>