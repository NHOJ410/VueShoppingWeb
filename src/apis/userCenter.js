import http from '@/utils/http'

// 獲取個人中心資料 
export const getLikeListAPI = ({ limit = 4 }) => {
  return http({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}