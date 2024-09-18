import http from '@/utils/http'

// 獲取訂單結算頁的數據
export const getSettlementData = () => {
  return http({
    url: '/member/order/pre'
  })
}