<script setup>
// 導入組件
import LayoutCart from '@/Layout/components/LayoutCart.vue'; // 頭部購物車組件

// 導入插件
import { useScroll } from "@vueuse/core"; // 導入VueUse獲取滾動位置插件
// 導入 Pinia 倉庫
import { useCategoryStore } from "@/stores"; // 導入商品分類倉庫
const categoryStore = useCategoryStore(); // 定義商品分類倉庫



// ------ 導航條吸附功能 ------

//  使用VueUse獲取滾動位置 
const { y } = useScroll(window)


</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink to="/">
        <SVGItem :svgName="'vueLogo'" width="80" height="80" alt="Vue Logo"></SVGItem>
      </RouterLink>
      <!-- 頭部導航列表區域 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li class="home" v-for="item in categoryStore.categoryNav" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <!-- 購物車部分 -->
      <LayoutCart></LayoutCart> 
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

  // 狀態一 : 往上平移自身高度 + 完全透明 ( 隱藏起來 )
  transform: translateY(-100%);
  opacity: 0;

  // 狀態二 : 移出平移 顯示導航欄 + 去除透明度讓它顯示出來
  &.show {
    transition: all 0.5s linear;
    transform: none;
    opacity: 1;
  }

  // 導航內容部分
  .container {
    display: flex;
    align-items: center;
    gap: 80px;

    // 左側主要導航
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
            color: $mainColor;
            border-bottom: 1px solid $mainColor;
            font-size: 1.3em;
            transition: 0.5s all ease;
          }
        }

        .active {
          color: $mainColor;
          border-bottom: 1px solid $mainColor;
        }
      }
    }
  }
}
</style>