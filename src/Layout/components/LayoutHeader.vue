<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useUserInfoStore, useCartStore } from '@/stores'; // 導入用戶數據倉庫

const userStore = useUserInfoStore() // 定義user倉庫
const cartStore = useCartStore() // 定義 購物車倉庫

const { userInfo } = storeToRefs(userStore) // 將 user倉庫想要用到的數據/方法 解構出來

const router = useRouter()

// 登出按鈕邏輯
const onLoginOut = () => {
  // 登出後 調用 user倉庫方法 , 清空用戶數據
  userStore.clearUserInfo()

  // 跳轉到登入頁面
  router.push('/login')
}


</script>

<template>
  <nav class="header-nav">
    <div class="container">
      <ul>
        <!-- 用戶已登入狀態 -->
        <template v-if="userInfo.token">
          <li><router-link to="/userCenter"><i class="iconfont icon-icon_user"></i>John</router-link></li>
          <li><router-link to="/userCenter/order"><i class="iconfont icon-menu"></i>我的訂單</router-link></li>
          <li><router-link to="/userCenter/user"><i class="iconfont icon-customer-center"></i>會員中心</router-link></li>
          <li><a href="https://github.com/NHOJ410/VueShoppingWeb" target="_blank"><i class="iconfont icon-github"></i>聯絡我們</a></li>
          <li><router-link to="/cartList"><i class="iconfont icon-al-icon-cart"><em class="cartNum" v-show="cartStore.cartList.length !== 0">{{
            cartStore.cartList.length }}</em></i>購物車</router-link></li>
          <li>
            <!-- 登出按鈕 -->
            <el-popconfirm title="確認要登出嗎?" width="160px" confirm-button-text="確認" cancel-button-text="取消"
              @confirm="onLoginOut">
              <template #reference>
                <a href="#"><i class="iconfont icon-logout"></i>登出</a>
              </template>
            </el-popconfirm>
          </li>
        </template>

        <!-- 未登入狀態 -->
        <template v-else>
          <li><a href="#" @click="router.push('/login')"><i class="iconfont icon-login"></i>請先登入</a></li>
          <li><a href="#"><i class="iconfont icon-help"></i>幫助中心</a></li>
          <li><a href="https://github.com/NHOJ410/VueShoppingWeb"><i class="iconfont icon-github"></i>關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
// 頂部導航條部分
.header-nav {
  background: #40c057;
  transform: translateY(-40px);

  ul {
    display: flex;
    height: 60px;
    justify-content: flex-end;
    align-items: center;


    // 導航區域
    li {

      // 導航按鈕
      a {
        padding: 0 30px;
        color: #fff;
        line-height: 1;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;        
        
        // 導航圖標
        i {
          color: #fff;
          font-size: 18px;
          margin-right: 8px;
        }
       
        
        // 購物車圖標部分 ( 圖標太小 這裡放大一點)
        .icon-al-icon-cart {
          font-size: $thirdFontSize;
          position: relative;
          .cartNum {
            font-size: 12px;
            position: absolute;
            top: -4px;
            right: -7px;
            display: block;
            background-color: rgb(255, 0, 0);
            width: 15px;
            height: 15px;
            border-radius: 75%;
            text-align: center;
            line-height: 1;
            padding: 2px 2px;
          }
        } 
      }
    }
  }
}
</style>
