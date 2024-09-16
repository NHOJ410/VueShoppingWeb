<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useUserInfoStore } from '@/stores'; // 導入用戶數據倉庫

const userStore = useUserInfoStore() // 定義user倉庫

const {  userInfo } = storeToRefs(userStore) // 將 user倉庫想要用到的數據/方法 解構出來


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
        <!-- 登入狀態 -->
        <template v-if="userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>John</a></li>
          <li><a href="javascript:;">我的訂單</a></li>
          <li><a href="javascript:;">會員中心</a></li>
          <li>
          <!-- 登出按鈕 -->
            <el-popconfirm title="確認要登出嗎?" confirm-button-text="確認" cancel-button-text="取消" @confirm="onLoginOut">
              <template #reference>
                <a href="javascript:;">登出</a>
              </template>
            </el-popconfirm>
          </li>
        </template>
        <!-- 未登入狀態 -->
        <template v-else>
          <li><a href="javascript:;" @click="router.push('/login')">請先登入</a></li>
          <li><a href="javascript:;">幫助中心</a></li>
          <li><a href="javascript:;">關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">

// 頂部導航條部分
.app-topnav {
  background: #333333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    // 導航區域
    li {
      a {
        padding: 0 20px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
