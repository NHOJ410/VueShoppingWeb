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


/**
 * 獲取 24小時 和 週熱榜數據 
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小時 , 2代表週熱榜
 * @param {Number} limit - 獲取商品個數
 */

export const getHotDetail = ({ id , type , limit }) => { 
  return http({
    url : '/goods/hot',
    params : {
      id,
      type,
      limit
    }
  })
}