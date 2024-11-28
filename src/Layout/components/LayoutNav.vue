<script setup>
import { ref} from 'vue'
// 導入組件
import LayoutCart from '@/Layout/components/LayoutCart.vue'; // 頭部購物車組件
import { Search } from '@element-plus/icons-vue'

// 導入 Pinia倉庫
import { useCategoryStore } from '@/stores' // 導入商品分類倉庫
const categoryStore = useCategoryStore() // 定義商品分類倉庫

const searchValue = ref('') // 綁定搜索框的值

// 搜索框的事件函數 ( 由於接口請求不到 所以提示用戶 )
const focusInp = async () => {

  await ElMessageBox.alert(
    '這裡的api好像有點問題 所以沒有做= =',
    '不好意思',
    {
      confirmButtonText: '好的'
    }
  )

  searchValue.value = ''

}

</script>
<template>
  <!-- 頭部導航條部分 -->
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">Vue購物商城</RouterLink>
      </h1>
      <!-- 頭部導航欄部分 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li class="home" v-for="item in categoryStore.categoryNav" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </li>
      </ul>

      <!-- 搜索框部分 -->
      <div class="search">
        <el-autocomplete @input="focusInp" v-model="searchValue" placeholder="請輸入想要搜索的商品" :fit-input-width="true"
          style="width: 280px" :icon="Search">
          <template #prepend>
            <el-button style="border-radius: 0; background: linear-gradient(to right, #a8ff78, #78ffd6);" :icon="Search" @click="focusInp"/>
          </template>
        </el-autocomplete>
      </div>
      <!-- 頭部購物車區域 -->
      <LayoutCart></LayoutCart>

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
      background: url('@/assets/images/Vuelogo.webp') no-repeat center / contain;
    }
  }

  // 頭部導航條部分
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 60px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 30px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
        transition: 0.4s all ease;


        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
          transform: scale(1.2);
        }
      }

      // active激活時觸發的顏色
      .active {
        transform: scale(1.2);
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  

}
</style>