import http from '@/utils/http'

// 獲取輪播圖數據
export const getBannerService = (type) => {
  return http({
    url : '/home/banner',
    params : {
      distributionSite : type
    }
  })
}

// 獲取新鮮好物商品列表
export const getNewsService = (type) => {
  return http({
    url : '/home/new',
    params : {
      limit: type // 需要的數據數量
    }
  })
}

// 獲取人氣推薦商品列表 
export const getHotService = () => {
  return http({
    url :'/home/hot'
  })
}
