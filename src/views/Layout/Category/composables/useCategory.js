import { ref , onMounted } from "vue";
import { useRoute , onBeforeRouteUpdate } from "vue-router";
// 導入api
import { getCategoryService } from "@/apis/category.js"; // 獲取 一級分類數據接口

 

export const useCategoryData = () => { 

  // 獲取路由
  const route = useRoute();

  // 獲取一級分類數據
  const categoryList = ref({}) // 存儲一級分類列表數據
  // 發送請求 獲取一級分類數據
  const getCategory = async ( id = route.params.id) => {
    const res = await getCategoryService(id)
    categoryList.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  // 使用 onBeforeRouteUpdate 監聽路由參數變化時 所做出對應的行為(和watch很像)
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    categoryList
  }

}