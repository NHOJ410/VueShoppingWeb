<script setup>
// 導入組件
import SubList from './components/SubList.vue'  // 全部分類組件
import GoodsItem from "@/components/GoodsItem.vue"; // 商品組件
// 導入封裝好的hooks
import { useBanner } from "./composables/useBanner"; // 輪播圖業務邏輯
import { useCategoryData } from '@/views/Category/composables/useCategory' // 獲取一級分類列表部分


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
        <el-breadcrumb separator="➔">
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
        <SubList :categoryList="categoryList"></SubList>
      </div>

      <!-- 底部商品部分 -->
      <div class="ref-goods" v-for="item in categoryList.children" :key="item.id">
        <!-- 標題部分 -->
        <div class="head">
          <h3>{{ item.name }}</h3>
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

  // 頂部麵包屑組件
  @include bread-item;

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