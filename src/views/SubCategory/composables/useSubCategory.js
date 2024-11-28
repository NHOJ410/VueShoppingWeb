
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 調用 api 
import { getSubCategoryService } from '@/apis/subCategory' // 獲取二級分類數據
import { getSubContent } from '@/apis/subCategory' // 獲取二級分類列表內容

export const useGetSubCategoryList = () => {
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

  onMounted(() => {
    // 發送請求 獲取數據
    getSubCategoryList()
  })


  // ------------ 獲取二級分類列表內容數據 ------------- 

  const subCategoryContent = ref([]) // 存儲二級分類列表內容
  
  // 無限加載api 需要的參數
  const contentData = ref({ 
    categoryId: route.params.id, // 二級分類 ID
    page: 1, // 頁數
    pageSize: 20, // 單頁多少條數據
    sortField: '' || 'publishTime'// 排序方式 ( 這裡默認是最新商品 )
  })

  const getSubCategoryContent = async () => {

    const res = await getSubContent(contentData.value)
    subCategoryContent.value = res.result.items

  }

  onMounted(() => {
    // 發送請求 獲取數據
    getSubCategoryContent()
  })

  // 篩選功能處理 
  const tabChange = (value) => {

    // 讓當前頁數回到第一頁
    contentData.value.page = 1
    // 變更排序方式 (但這裡好像都不會變)
    contentData.value.sortField = value

    // 重新調用接口 獲取新的數據 
    getSubCategoryContent()
  }



  return {
    subCategoryList, // 二級分類數據
    subCategoryContent, // 二級分類列表內容數據
    contentData, // 無限加載api 需要的參數
    tabChange // 篩選功能「不過接口不給力」
  }

}