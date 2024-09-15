import { defineStore } from "pinia";
import { ref } from 'vue'
// 導入api
import { loginService } from '@/apis/login.js'

export const useUserInfoStore = defineStore('user', () => {
  
  // 存儲用戶信息
  const userInfo = ref({})

  // 調用接口來獲取用戶信息
  const getUserInfo = async (data) => {
    const res =  await loginService(data)
    userInfo.value = res.result
  }
  
  // 最後要記得 return 出去
  return {
    userInfo,
    getUserInfo
  }
},{
  // 開啟持久化插件
  persist: true
})