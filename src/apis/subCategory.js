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