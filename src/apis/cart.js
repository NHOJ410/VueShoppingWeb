import http from '@/utils/http'


// 獲取購物車列表
export const getCartListService = () => {
  return http({
    url: '/member/cart'
  })
}

// 加入購物車商品
export const addCartService = (skuId , count) => {
  return http({
    url : '/member/cart',
    method : 'post',
    data:{
      skuId,
      count
    }
  })
}

