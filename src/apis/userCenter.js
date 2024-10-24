import http from '@/utils/http'

// 獲取 猜你喜歡的商品資料 
export const getLikeListAPI = ({ limit = 4 }) => {
  return http({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}


// 獲取 我的訂單資料

/*
params: {
	orderState:0,  // tab欄切換的狀態
  page:1,        // 當前頁數
  pageSize:2     // 總頁數
}
*/

export const getUserOrderAPI = (params) => {
  return http({
    url:'/member/order',
    params
  })
}


