<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// 調用 api 
import { getSubCategoryService } from '@/apis/subCategory' // 獲取二級分類數據

// ------------ 獲取二級分類數據 -------------

const route = useRoute()

const subCategoryList = ref({}) // 存儲二級分類數據

// 定義方法 獲取動態路由參數
const getSubCategoryList = async () => {
  
  const res = await getSubCategoryService(route.params.id)

  subCategoryList.value = res.data.result// 存儲二級分類數據
  
}

// 發送請求 獲取數據
getSubCategoryList()



</script>

<template>

  <div class="container ">
    <!-- 面包屑導航 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryList.parentId}` }">{{ subCategoryList.parentName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
         <!-- 商品列表-->
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
// 麵包屑導航區域
.bread-container {
  padding: 25px 0;
  .el-breadcrumb {
      font-size: 15px;
    }
}
// 內容主體區域
.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>