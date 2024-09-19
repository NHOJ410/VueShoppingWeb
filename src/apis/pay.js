import http from '@/utils/http'

// 獲取訂單詳情
export const getOrderService = (id) => {
  return http({
    url: `/member/order/${id}`
  })
}