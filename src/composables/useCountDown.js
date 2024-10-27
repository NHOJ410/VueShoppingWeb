import { ref, computed, onUnmounted } from 'vue'
import { dayjs } from 'element-plus'


// 支付頁面 倒數計時函數
export const useCountDown = () => {

  // 用來存儲 後端傳進來的 倒數時間的變量
  const time = ref(0)

  // 處理後端傳遞過來的剩餘時間(ms) 
  const formatTime = computed(() => {
    // 調用 unix()方法 將得到的毫秒數傳入進去 再利用 format()方法進行格式化
    return dayjs.unix(time.value).format('mm 分 ss 秒')
  })
  
  let timer = ref(null) // 存儲定時器的函數

  // 開啟倒數計時函數 start()
  const start = (currentTime) => {

    //  調用 start 函數時 , 將傳進來的 currentTime 賦值給 time
    time.value = currentTime

    //  開啟定時器 , 讓倒數計時進行 , 讓他每秒減1
    timer = setInterval(() => {
      time.value--

      // 1. 當秒數為0的時候 關閉定時器
      if (time.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)

  }

  // 2. 組件銷毀時 清除定時器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })


  //  將需要使用到的方法 return 出去 
  return {
    formatTime,
    start
  }
}