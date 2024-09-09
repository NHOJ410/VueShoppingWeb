<script setup>
import { ref } from "vue";
// 導入插件
import { useScroll } from "@vueuse/core"; // 導入VueUse獲取滾動位置插件
// 導入 Pinia 倉庫
import { useCategoryStore } from "@/stores"; // 導入商品分類倉庫


const categoryStore = useCategoryStore(); // 定義商品分類倉庫



// ------ 導航條吸附功能 ------

const { y } = useScroll(window); // 獲取滾動位置

</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 頭部商品列表區域 -->
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryNav" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">專題</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此處為關鍵樣式!

  // 狀態一 : 往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 狀態二 : 移出平移 顯示導航欄 + 去除透明度讓它顯示出來
  &.show {
    transition: all 0.5s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

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
</style>