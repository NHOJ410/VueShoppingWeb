import axios from 'axios'
import 'element-plus/dist/index.css'
import { ElMessage , ElMessageBox , ElLoading} from 'element-plus'
import router from '@/router'
// 導入user倉庫 
import { useUserInfoStore } from '@/stores'

// 進度條組件
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 控制 el-loading的變量
let loadingInstance = false

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInstance = axios.create({
  // 配置基地址 , 超時時間
  baseURL,
  timeout: 20000
})

// 添加請求攔截器
httpInstance.interceptors.request.use(function (config) {
  // 開啟進度條組件
  nProgress.start()
  // 在發送請求之前做些什麼
  // 定義user倉庫 拿到token
  const userStore = useUserInfoStore()
  const token = userStore.userInfo.token

  // 判斷 如果有token的時候 就在請求時攜帶上token
  if ( token ) config.headers.Authorization = `Bearer ${token}`


  // 開始顯示 loading
  loadingInstance = ElLoading.service({
    lock: true,
    text: '因為是中國的api 所以可能會有點慢 請見諒...',
    customClass: 'custom-loading'
  });
  
  

  return config;
}, function (error) {
  // 對請求錯誤做些什麼
  
  // 關閉進度條組件
  nProgress.done()

  // 請求錯誤時關閉 loading
  if (loadingInstance) {
    loadingInstance.close();
  }

  return Promise.reject(error);
});



// 添加響應攔截器
httpInstance.interceptors.response.use(function (response) {
  // 關閉進度條組件
  nProgress.done()
  // 2xx 範圍內的狀態碼都會觸發該函數。
  // 對響應數據做點什麼

  // 請求成功時關閉 loading
  if (loadingInstance) {
    loadingInstance.close();
  }
  

  return response.data

}, function (error) {
  // 超出 2xx 範圍的狀態碼都會觸發該函數。
  // 對響應錯誤做點什麼
  // 關閉進度條組件
  nProgress.done()

  // 由於後端服務器真的不給力 = = 所以在請求超時「20秒」後自動刷新
  if (error.code === 'ECONNABORTED') {
    console.error('請求超時!請重新刷新頁面');
  }

  // 請求錯誤時關閉 loading
  if (loadingInstance) {
    loadingInstance.close();
  }

  // token過期/失效處理 , 當響應狀態碼是401的時候
  if ( error.response.status === 401 ) {
    
    // 調用清除用戶信息的方法
    const userStore = useUserInfoStore()
    userStore.clearUserInfo()
    
    // 使用確認框組件詢問用戶是否要跳轉到登入頁面
    ElMessageBox.confirm(
      '你好像還沒有登入 ! 請問要跳轉到登入頁面嗎',
      '溫馨提示',
      {
        confirmButtonText: '跳轉到登入頁面',
        cancelButtonText: '我再逛逛,系統將自動跳轉回首頁',
        type: 'warning',
      }
    ).then(() => { // 跳轉到登入頁面邏輯
        router.push('/login')
    })
      

    return
  }

  ElMessage.error(error.response?.data.message || '服務器錯誤!')

  

  return Promise.reject(error);
});


export default httpInstance
