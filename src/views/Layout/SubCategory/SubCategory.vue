<script setup>
import { ref , onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 調用 api 
import { getSubCategoryService } from '@/apis/subCategory' // 獲取二級分類數據
import { getSubContent } from '@/apis/subCategory' // 獲取二級分類列表內容
// 導入組件 
import GoodsItem from '@/views/Layout/Home/components/GoodsItem.vue' // 產品列表組件

onMounted(() => {
  ElMessageBox.alert('API有問題 , 怎麼切換排序都不會變 😢', '提示', {
    confirmButtonText: '確定',
    type : 'warning'
  })
})

// ------------ 獲取二級分類數據 -------------

const route = useRoute()


const subCategoryList = ref({}) // 存儲二級分類數據

// 定義方法 獲取動態路由參數
const getSubCategoryList = async () => {

  // 因為在首頁輪播圖使用強制跳轉 , 所以這裡加一個判斷 不然會報錯
  if (route.matched[0].path === '/') return

  const res = await getSubCategoryService(route.params.id)

  subCategoryList.value = res.result// 存儲二級分類數據

}
// 發送請求 獲取數據
getSubCategoryList()


// ------------ 獲取二級分類列表內容數據 ------------- 

const subCategoryContent = ref([]) // 存儲二級分類列表內容


const contentData = ref({ // 用來傳遞參數
  categoryId: route.params.id, // 二級分類 ID
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
const tabChange = (value) => {

  // 讓當前頁數回到第一頁
  contentData.value.page = 1
  // 變更排序方式 (但這裡好像都不會變)
  contentData.value.sortField = value

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
  if (res.result.items.length === 0) {
    onDisabled.value = true
    contentData.value.page = 1
  }

}

</script>

<template>

  <div class="container ">
    <!-- 面包屑導航 -->
    <div class="bread-container">
      <el-breadcrumb separator=">" v-if="subCategoryList.parentId">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryList.parentId}` }">{{ subCategoryList.parentName
          }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- tab欄切換列表部分 -->
    <div class="sub-container">
      <el-tabs v-model="contentData.sortField" @tab-change="tabChange" :type="'border-card'" :stretch="true">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
        <!-- 商品列表內容(使用了懶加載功能來展示更多的商品) -->
        <div class="body" v-infinite-scroll="getNewList" :infinite-scroll-disabled="onDisabled"
          :infinite-scroll-delay="1000">
          <!-- 二級分類列表內容-->
          <GoodsItem v-for="good in subCategoryContent" :good="good" :key="good.id" />
        </div>
      </el-tabs>


    </div>
  </div>

</template>



<style lang="scss" scoped>
// 麵包屑導航區域
.bread-container {
  padding: 25px 0;

  .el-breadcrumb {
    font-size: 20px;
  }
}

// 商品列表區域
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
    width: 190px;
    padding: 20px 30px;
    text-align: center;
  }

}
</style>