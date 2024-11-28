import { createRouter, createWebHistory } from 'vue-router'
// 導入倉庫
import { useUserInfoStore } from '@/stores'// 導入用戶倉庫

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一級路由 
    { path:'/login' , component: () => import('@/views/Login/LoginPage.vue')}, // 登入頁面
    // 首頁架子
    { path:'/' , 
      component: () => import('@/Layout/LayoutContainer.vue'),
      redirect: '/home', // 重定向到首頁
      // 二級路由
      children: [
        { path : '/home' , component: () => import('@/views/Home/Home.vue') }, // 首頁
        { path : '/category/:id' , component: () => import('@/views/Category/Category.vue')}, // 商品分類頁面
        { path : '/category/sub/:id' , component : () => import('@/views/SubCategory/SubCategory.vue') }, // 二級分類頁面
        { path : '/detail/:id' , name : 'detail' , component : () => import('@/views/Detail/Detail.vue') }, // 商品詳情頁面
        { path : '/cartList' , component : () => import ('@/views/CartList/CartList.vue')}, // 購物車列表頁面
        { path : '/settlement' , component : () => import ('@/views/Settlement/Settlement.vue') }, // 結算頁面
        { path : '/pay' , component : () => import ('@/views/Pay/Pay.vue') }, // 支付頁面
        { 
          path : '/userCenter' ,  // 個人中心頁面
          component : () => import ('@/views/UserCenter/UserCenter.vue'),
          redirect: '/userCenter/user', // 一到個人中心頁面直接定向到 會員資料
          // 個人中心下的三級路由
          children : [
            // 個人中心 - 會員資料
            { path : 'user' , component : () => import('@/views/UserCenter/components/UserInfo.vue') },
            // 個人中心 - 我的訂單
            { path : 'order' , component : () => import('@/views/UserCenter/components/UserOrder.vue') }
          ]
        
        }, 
      ],
    }, 
    // 未匹配路由頁面
    { path : '/notFound' , component : () => import ('@/views/NotFound/NotFound.vue')},
    
    // 捕獲所有未匹配的路由並重定向到 notFound
    { path: '/:pathMatch(.*)*', redirect: '/notFound' }
  ],
  // 在路由跳轉時 , 始終從頂部開始
  scrollBehavior() {
    return { top: 0 }
  }
})



// 路由前置守衛
router.beforeEach((to) => {
  
  const userInfoStore = useUserInfoStore();
  const token = userInfoStore.userInfo.token
  // 如果想要在登入狀態下(有token)去強行訪問 「登入頁面」 就導回首頁
  if (to.path === '/login' && token ) {
     return '/home' 
  }
})




export default router
