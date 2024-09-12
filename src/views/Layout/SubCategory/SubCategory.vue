<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// 調用 api 
import { getSubCategoryService } from '@/apis/subCategory' // 獲取二級分類數據
import { getSubContent } from '@/apis/subCategory' // 獲取二級分類列表內容
// 導入組件 
import GoodsItem from '@/views/Layout/Home/components/GoodsItem.vue' // 產品列表組件

// ------------ 獲取二級分類數據 -------------

const route = useRoute()

const subCategoryList = ref({}) // 存儲二級分類數據

// 定義方法 獲取動態路由參數
const getSubCategoryList = async () => {
  
  const res = await getSubCategoryService(route.params.id)

  subCategoryList.value = res.result// 存儲二級分類數據
  
}
// 發送請求 獲取數據
getSubCategoryList()


// ------------ 獲取二級分類列表內容數據 ------------- 

const subCategoryContent = ref([]) // 存儲二級分類列表內容


const contentData = ref({ // 用來傳遞參數
  categoryId : route.params.id, // 二級分類 ID
  page: 1, // 頁數
  pageSize: 20, // 單頁多少條數據
  sortField: '' || 'publishTime'// 排序方式 ( 這裡默認是最新商品 )
})

const getSubCategoryContent = async () => {
  const res = await getSubContent(contentData.value)
  subCategoryContent.value = res.result.items
}
getSubCategoryContent()

// 篩選功能處理 
const tabChange = () => {
  // 讓當前頁數回到第一頁
  contentData.value.page = 1
  // 重新調用接口 獲取新的數據 
  getSubCategoryContent()
}

// 定義scroll 監聽 默認為 false 
const onDisabled = ref(false)

//  頁面無限加載事件
const getNewList = async () => {
  
  //  滾動到底部時 讓頁數++ 達成無限加載
  contentData.value.page++
  
  //  再次發送請求  獲取新的數據 
  const res = await getSubContent(contentData.value)

  //  此時 res 拿到的就是新的數據了 , 接下來進行數據拼接 (這裡不用數組 contain方法 , 用展開運算符來拼接 )
  subCategoryContent.value = [...subCategoryContent.value, ...res.result.items] 
  
  // 當後端沒有數據的時候 , 停止監聽 ( 防止性能浪費 )
  if ( res.result.items.length === 0 ) {
     onDisabled.value = true
     contentData.value.page = 1
  }
  
}

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
      <el-tabs v-model="contentData.sortField" @tab-change="tabChange" >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="getNewList" :infinite-scroll-disabled="onDisabled" :infinite-scroll-delay="2000">
         <!-- 二級分類列表內容-->
        <GoodsItem v-for="good in subCategoryContent" :good="good" :key="good.id" />
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