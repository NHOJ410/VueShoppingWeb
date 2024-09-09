<script setup>
import { ref } from 'vue';
// 導入api 
import { getCategoryNavService } from '@/apis/layout'; // 獲取頭部商品導航條
// 導入 Pinia倉庫
import { useCategoryStore } from '@/stores' // 導入商品分類倉庫
const categoryStore = useCategoryStore() // 定義商品分類倉庫


</script>
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔仙</RouterLink>
      </h1>
      <!-- 頭部商品列表區域 -->
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryNav" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="請輸入你想查詢的商品">
      </div>
      <!-- 頭部購物車區域 -->
      
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }
  
  // 頭部Logo
  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }
  
  // 頭部導航條部分
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
  
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
  
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
  
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
  
  // 頭部右側搜索框
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
      vertical-align: middle;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  
}
</style>