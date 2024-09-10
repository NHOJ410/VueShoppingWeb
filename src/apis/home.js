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