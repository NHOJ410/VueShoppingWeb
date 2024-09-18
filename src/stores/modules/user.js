import { defineStore } from "pinia";
import { ref } from 'vue'
// 導入api
import { loginService } from '@/apis/login.js' // 導入登入接口
import { mergeCartService } from "@/apis/cart";//  導入合併購物車接口
// 導入倉庫
import { useCartStore } from '@/stores/' // 導入購物車倉庫

export const useUserInfoStore = defineStore('user', () => {

  const cartStore = useCartStore() // 定義購物車倉庫


  
  // 存儲用戶信息
  const userInfo = ref({})

  // 調用接口來獲取用戶信息 ( 登入功能 )
  const getUserInfo = async (data) => {
    const res =  await loginService(data)
    userInfo.value = res.result
    
    // 登入後 調用合併購物車請求 , 將本地購物車和後端數據合併
    await mergeCartService(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    
    // 調用 cartStore倉庫方法 , 獲取最新的購物車列表數據
    cartStore.getLoginUserList()

  }

  // 清除用戶訊息 ( 登出功能 )
  const clearUserInfo = () => {
    // 清空用戶訊息
    userInfo.value = {}
    // 清空購物車列表商品
    cartStore.clearCartList()
  }
   
  // 最後要記得 return 出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  // 開啟持久化插件
  persist: true
})