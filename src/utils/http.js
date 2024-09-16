import axios from 'axios'
import { ElMessage } from 'element-plus'
// 導入user倉庫 
import { useUserInfoStore } from '@/stores'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInstance = axios.create({
  // 配置基地址 , 超時時間
  baseURL,
  timeout: 5000
})

// 添加請求攔截器
httpInstance.interceptors.request.use(function (config) {
  // 在發送請求之前做些什麼
  // 定義user倉庫 拿到token
  const userStore = useUserInfoStore()
  const token = userStore.userInfo.token

  // 判斷 如果有token的時候 就在請求時攜帶上token
  if ( token ) config.headers.Authorization = `Bearer ${token}`
  
  

  return config;
}, function (error) {
  // 對請求錯誤做些什麼
  return Promise.reject(error);
});



// 添加響應攔截器
httpInstance.interceptors.response.use(function (response) {
  // 2xx 範圍內的狀態碼都會觸發該函數。
  // 對響應數據做點什麼
  

  return response.data

}, function (error) {
  // 超出 2xx 範圍的狀態碼都會觸發該函數。
  // 對響應錯誤做點什麼

  ElMessage.error(error.response?.data.message || '服務器錯誤!')

  return Promise.reject(error);
});


export default httpInstance
