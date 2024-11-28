import { defineStore } from 'pinia';
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
// 導入api
import { getSettlementData, submitOrder } from '@/apis/settlement'; // 獲取訂單結算頁的資料

// 導入倉庫
import { useCartStore } from '@/stores' // 導入 購物車倉庫


export const usePayOrderStore = defineStore('payOrder', () => {


  // ---------- 獲取訂單結算頁的資料 -----------
  const orderData = ref({})  // 訂單資料
  const defaultAddress = ref({})  // 默認地址資料 ( 呈現在頁面中的 )
  const addressList = ref([]) // 收貨地址列表
  // 獲取訂單詳情數據
  const getSettlement = async () => {

    const res = await getSettlementData()

    orderData.value = res.result // 訂單資料
    
    // 找到後端提供的默認地址資料來渲染頁面 「api設計 isDefault 為 0 代表默認地址 」
    defaultAddress.value = res.result.userAddresses.find(item => item.isDefault === 0) 

    addressList.value = res.result.userAddresses // 收貨地址列表
  }


  // ---------- 切換收貨地址部分 -----------

  const toggleFlag = ref(false) // 控制切換地址的顯示隱藏變量

  const activeAddress = ref({}) // 用戶切換的的收貨地址

  // 切換收貨地址事件處理函數
  const switchAddress = (item) => {

    activeAddress.value = item // 存儲用戶切換的的收貨地址

  }

  // 確認切換收貨地址事件處理函數
  const onChangeAddress = () => {
    // 將我們切換的收貨地址存儲到默認地址中
    defaultAddress.value = activeAddress.value
    // 關閉彈窗
    toggleFlag.value = false

    // 提示用戶切換地址成功
    ElMessage.success({
      message: '切換收貨地址成功 !',
      duration: 3000
    })
  }


  // -------------------- 提交訂單部分 ---------------------

  // 定義倉庫
  const cartStore = useCartStore() // 定義 購物車倉庫

  // 定義 Router
  const router = useRouter()

  // 提交訂單按鈕 
  const onSubmitOrder = async () => {

    // 調用接口 提交訂單給後台
    const res = await submitOrder({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: orderData.value.goods.map(item => {
        return {
          skuId: item.skuId,
          count: item.count
        }
      }),
      addressId: defaultAddress.value.id
    })

    // 將後台返回的訂單 id 存入進來
    const id = res.result.id

    // 利用查詢參數跳轉傳參的方式來跳轉
    router.replace({
      path: '/pay',
      // 將支付頁面需要的 訂單id傳進去 以便調用接口做渲染
      query: {
        id
      }
    })


    // 跳轉到支付頁面後 , 要更新購物車的最新數據 調用之前在 cartStore封裝的方法
    cartStore.getLoginUserList()

  }




  return {

    // ---------- 獲取訂單結算頁的資料 -----------
    orderData,  // 訂單資料 
    defaultAddress,  // 默認地址資料 ( 呈現在頁面中的 )
    addressList, // 收貨地址列表
    getSettlement, // 獲取訂單詳情數據


    // ---------- 切換收貨地址部分 -----------
    toggleFlag, // 控制切換地址的顯示隱藏變量
    activeAddress, // 用戶切換的的收貨地址
    switchAddress, // 切換收貨地址事件處理函數
    onChangeAddress, // 確認切換收貨地址事件處理函數
    
    // -------------------- 提交訂單部分 ---------------------
    onSubmitOrder // 提交訂單按鈕
  }
})