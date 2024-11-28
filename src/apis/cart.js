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

// 刪除購物車商品
export const deleteCartService = ( ids ) => {
  return http({
    url:'/member/cart',
    method:'delete',
    data:{
      ids
    }
  })
}

// 切換購物車的全選 / 取消
export const changeAllSelectService = (selected , ids ) => {
  return http({
    url : '/member/cart/selected',
    method : 'put',
    data : {
      selected,
      ids
    }
  })
}

// 合併 本地購物車到後端購物車
export const mergeCartService = ( data ) => {
  return http({
    url:'/member/cart/merge',
    method:'post',
    data
  })
}