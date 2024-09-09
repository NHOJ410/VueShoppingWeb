import { defineStore } from "pinia";
import { ref } from 'vue'
// 導入api
import { getCategoryNavService } from "@/apis/layout"; // 獲取商品導航條 數據


export const useCategoryStore = defineStore('category', () => {
  
 // -------- 獲取商品導航條數據 ---------

 // 存儲頭部商品導航條數據
 const categoryNav = ref([]) 

 // 獲取頭部商品導航條 
 const getCategory = async () => {
   const result = await getCategoryNavService()
   categoryNav.value = result.data.result
 }



  // 別忘記 Pinia定義完的數據 方法要 return 
  return {
    categoryNav,
    getCategory
  }
})