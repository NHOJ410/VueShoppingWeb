import http from '@/utils/http'

// 獲取頭部的導航欄
export const getCategoryNavService = () => {
  return http({
    url : '/home/category/head',
  })
}