<script setup>
// 導入組件
import GoodsItem from "@/views/Layout/Home/components/GoodsItem.vue"; // 商品組件
// 導入封裝好的hooks
import { useBanner } from "./composables/useBanner"; // 輪播圖業務邏輯
import { useCategoryData } from '@/views/Layout/Category/composables/useCategory' // 獲取一級分類列表部分


// ---------- 獲取一級分類列表部分 -----------
const { categoryList } = useCategoryData();

// ---------- 輪播圖部分 -----------
const { bannerList } = useBanner()



</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑導航 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item >{{ categoryList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 輪播圖區域 -->
      <div class="home-banner">
        <el-carousel height="440px">
          <el-carousel-item v-for="item in bannerList" :key="item.id" interval="2000" motion-blur="true"
            autoplay="true">
            <router-link :to="item.hrefUrl">
              <img :src="item.imgUrl" alt="" />
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 主體內容部分 ( 商品列表 ) -->
      <div class="sub-list">
        <!-- 頂部大標題和商品分類導航 -->
        <h3>全部分類</h3>
        <ul>
          <li v-for="item in categoryList.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink> 
          </li>
        </ul>
      </div>

      <!-- 底部商品部分 -->
      <div class="ref-goods" v-for="item in categoryList.children" :key="item.id">
        <!-- 標題部分 -->
        <div class="head">
          <h3>- {{ item.name }} -</h3>
        </div>
        <!-- 商品列表部分 ( 調用 GoodsItem組件) -->
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.top-category {


  // 面包屑導航樣式
  .bread-container {
    padding: 25px 0;

    .el-breadcrumb {
      font-size: 15px;
    }
  }

  // 輪播圖樣式
  .home-banner {
    width: 1240px;
    height: 500px;
    border-radius: 10px;

    // 輪播圖裡面的圖片大小
    img {
      width: 100%;
      height: 440px;
      border-radius: 10px;
      object-fit: cover;
    }

    // 加大輪播圖的箭頭樣式
    :deep(.el-carousel__arrow) {
      font-size: 30px;
      color: #ffffff;
    }
  }

  // 頂部大標題和商品分類導航
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;

    // 全部分類文字樣式
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }

    // 商品列表部分
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;
        transition: all .3s;
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
        }
       // 內容樣式
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          padding-top: 10px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 3.8;
          }

          &:hover {
            color: $xtxColor;
          }
        }

       
      }
    }
  }

  // 底部商品分類中的標題部分
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    border-radius: 10px;
    // 標題樣式
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    // 商品主體部分
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

}
</style>