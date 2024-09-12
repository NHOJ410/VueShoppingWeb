import http from '@/utils/http.js'

// 獲取二級分類數據
export const getSubCategoryService = (id) => {
  return http({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

// 獲取二級分類列表內容數據
/**
 * @description: 獲取導航數據
 * @data { 
     categoryId: 1005000 , // 商品列表 ID 
     page: 1,  // 頁數
     pageSize: 20, // 單頁多少條數據 
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum' // 排序方式
   } 
 * @return {*}
 */
   export const getSubContent = (data) => {
    return http({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }