import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一級路由 
    { path:'/login' , component: () => import('@/views/Login/LoginPage.vue')}, // 登入頁面

    { path:'/' , 
      component: () => import('@/views/Layout/LayoutContainer.vue'),
      redirect: '/home', // 重定向到首頁

      // 二級路由
      children: [
        { path : '/home' , component: () => import('@/views/Layout/Home/Home.vue') }, // 首頁
        { path : '/category/:id' , component: () => import('@/views/Layout/Category/Category.vue')}, // 商品分類頁面
        { path : '/category/sub/:id' , component : () => import('@/views/Layout/SubCategory/SubCategory.vue') }, // 二級分類頁面
        { path : '/detail/:id' , name : 'detail' , component : () => import('@/views/Layout/Detail/Detail.vue') }, // 商品詳情頁面
        { path : '/cartList' , component : () => import ('@/views/Layout/CartList/CartList.vue')}, // 購物車列表頁面
        { path : '/settlement' , component : () => import ('@/views/Layout/Settlement/Settlement.vue') }, // 結算頁面
        { path : '/pay' , component : () => import ('@/views/Layout/Pay/pay.vue') }, // 支付頁面
        { 
          path : '/userCenter' ,  // 個人中心頁面
          component : () => import ('@/views/Layout/UserCenter/UserCenter.vue'),
          redirect: '/userCenter/user', // 一到個人中心頁面直接定向到 會員資料
          // 個人中心下的三級路由
          children : [
            // 個人中心 - 會員資料
            { path : 'user' , component : () => import('@/views/Layout/UserCenter/components/UserInfo.vue') },
            // 個人中心 - 我的訂單
            { path : 'order' , component : () => import('@/views/Layout/UserCenter/components/UserOrder.vue') }
          ]
        
        }, 
        
      ]
    }, // 首頁架子
    
  ],
  // 在路由跳轉時 , 始終從頂部開始
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
