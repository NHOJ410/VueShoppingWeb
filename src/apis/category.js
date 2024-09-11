import http from '@/utils/http.js'

// 獲取一級 / 二級分類數據
export const getCategoryService = (id) => {
  return http({
    url:'/category',
    params:{
      id
    }
  })
}