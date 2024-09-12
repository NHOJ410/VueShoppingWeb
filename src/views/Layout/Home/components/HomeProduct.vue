<script setup>
import { ref } from 'vue'
// 引入組件
import HomePanel from './HomePanel.vue' // 標題組件
import GoodsItem from '@/views/Layout/Home/components/GoodsItem.vue' // 產品列表組件
// 引入 api
import { getProductService } from '@/apis/home'// 獲取產品列表數據

// ---------- 發送請求獲取產品列表數據 ----------
const productList = ref([]) // 產品列表數據
const getProductList = async () => {
  const res = await getProductService()
  productList.value = res.result
}
getProductList()

 
</script>

<template>
  <div class="home-product">
    <!-- 頂部標題 -->
    <HomePanel :title="item.name" v-for="item in productList" :key="item.id">
      <!-- 左側大圖片 -->
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-lazyLoading="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}館</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 右側商品列表 -->
        <ul class="goods-list">
          <li v-for="good in item.goods" :key="good.id">
            <GoodsItem :good="good"></GoodsItem>
          </li>
         </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 10px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }
  // 左側大圖片
  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 100%;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: 700;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }

  // 右側商品列表
  .goods-list {
      width: 990px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
}
</style>