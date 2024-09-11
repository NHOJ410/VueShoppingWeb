<script setup>
import { ref, onMounted } from "vue";
import { useRoute , onBeforeRouteUpdate } from "vue-router";
// 導入api
import { getBannerService } from "@/apis/home"; // 導入輪播圖數據
import { getCategoryService } from "@/apis/category.js"; // 獲取 一級分類數據接口
// 導入組件
import GoodsItem from "@/views/Layout/Home/components/GoodsItem.vue"; // 商品組件

// 獲取路由
const route = useRoute();

// ---------- 獲取一級分類列表部分 -----------

const categoryList = ref({}); // 存儲一級分類列表數據
// 發送請求 獲取一級分類數據
const getCategory = async ( id = route.params.id) => {
  const res = await getCategoryService(id);
  categoryList.value = res.data.result;
};
// 使用 onBeforeRouteUpdate 監聽路由參數變化時 所做出對應的行為(和watch很像)
onBeforeRouteUpdate((to) => {
  getCategory(to.params.id)

})

// ---------- 輪播圖部分 -----------
const bannerList = ref([]);
const getBanner = async () => {
  const result = await getBannerService(2);
  bannerList.value = result.data.result;
};

// 由於需要操作 DOM 所以在 onMounted() 鉤子中調用接口 獲取數據
onMounted(() => {
  getBanner(); // 獲取輪播圖數據
});
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑導航 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 輪播圖區域 -->
      <div class="home-banner">
        <el-carousel height="440px">
          <el-carousel-item
            v-for="item in bannerList"
            :key="item.id"
            interval="5000"
            motion-blur="true"
          >
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 主體內容部分 ( 商品列表 ) -->
      <div class="sub-list">
        <!-- 頂部大標題和商品分類導航 -->
        <h3>全部分類</h3>
        <ul>
          <li v-for="all in categoryList.children" :key="all.id">
            <RouterLink to="/">
              <img v-lazyLoading="all.picture" />
              <p>{{ all.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      
      <!-- 底部商品部分 -->
       <!-- 標題部分 -->
      <div class="ref-goods" v-for="item in categoryList.children" :key="item.id" >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <!-- 商品列表部分 ( 調用 GoodsItem組件) -->
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style  lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

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

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
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