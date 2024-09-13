import http from '@/utils/http'


// 獲取商品詳情頁面資料
export const getDetailData = (id) => {
  return http({
    url : '/goods',
    params:{
      id
    }
  })
}