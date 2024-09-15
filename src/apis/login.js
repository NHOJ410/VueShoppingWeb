import http from '@/utils/http'

// 登入接口
export const loginService = (data) => {
  return http({
    url:'/login',
    method:'post',
    data
  })
}