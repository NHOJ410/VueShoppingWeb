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
        { path : '/detail/:id' , component : () => import('@/views/Layout/Detail/Detail.vue') }, // 商品詳情頁面
        { path : '/cartList' , component : () => import ('@/views/Layout/CartList/CartList.vue')}, // 購物車列表頁面
        { path : '/settlement' , component : () => import ('@/views/Layout/Settlement/Settlement.vue') }, // 結算頁面
        { path : '/pay' , component : () => import ('@/views/Layout/Pay/pay.vue') } // 支付頁面
      ]
    }, // 首頁架子
    
  ],
  // 在路由跳轉時 , 始終從頂部開始
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
