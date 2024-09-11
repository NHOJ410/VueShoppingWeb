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
      ]
    }, // 首頁架子
    
  ]
})

export default router
