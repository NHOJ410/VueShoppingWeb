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
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 用戶已登入狀態 -->
        <template v-if="userInfo.token">
          <li><router-link to="/userCenter"><i class="iconfont icon-user"></i>John</router-link></li>
          <li><router-link to="/userCenter/order">我的訂單</router-link></li>
          <li><router-link to="/userCenter/user">會員中心</router-link></li>
          <li><router-link to="/cartList"><i class="iconfont icon-cart"><em class="cartNum" v-show="cartStore.cartList.length !== 0">{{
            cartStore.cartList.length }}</em></i>購物車</router-link></li>
          <li>
            <!-- 登出按鈕 -->
            <el-popconfirm title="確認要登出嗎?" width="160px" confirm-button-text="確認" cancel-button-text="取消"
              @confirm="onLoginOut">
              <template #reference>
                <a href="#">登出</a>
              </template>
            </el-popconfirm>
          </li>
        </template>

        <!-- 未登入狀態 -->
        <template v-else>
          <li><a href="#" @click="router.push('/login')">請先登入</a></li>
          <li><a href="#">幫助中心</a></li>
          <li><a href="#">關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
// 頂部導航條部分
.app-topnav {
  background: linear-gradient(to right, #2d5b6e, #376675, #2c5364);
  transform: translateY(-40px);

  ul {
    display: flex;
    height: 60px;
    justify-content: flex-end;
    align-items: center;


    // 導航區域
    li {
      a {
        padding: 0 20px;
        color: #fff;
        line-height: 1;
        display: inline-block;

        transition: all 0.3s ease;
        &:hover {
          color: $mainColor;
          transform: scale(1.2);
        }

        i {
          font-size: 14px;
          margin-right: 8px;
        }

        .icon-cart {
          position: relative;

          .cartNum {
            position: absolute;
            top: -10px;
            right: -7px;
            display: block;
            background-color: rgb(255, 0, 0);
            width: 15px;
            height: 15px;
            border-radius: 75%;
            text-align: center;
            line-height: 1;
          }
        }
        

        
      }

      


    }
  }
}
</style>
