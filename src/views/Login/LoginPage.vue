<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 導入組件
import TermsofService from '@/views/Login/components/TermsofService.vue' // 導入 服務條款組件
// 導入Pina倉庫
import { useUserInfoStore } from '@/stores/index.js' // 導入登入用戶倉庫
const userStore = useUserInfoStore() // 定義user倉庫
// 導入 hooks
import { useFormRules } from './composables/useFormRules.js' // 表單驗證
import { useWowPlugin } from '@/composables/useWowPlugin.js' // wow.js插件

// wow.js插件效果
useWowPlugin()

// ------------- 登入表單 -------------

// 登入表單-輸入框
const loginForm = ref({
  account: '',
  password: '',
  agree: false
})

// 登入表單 驗證規則
const { loginRules } = useFormRules()

// 獲取 登入表單實例對象
const loginRef = ref(null)

// 登入按鈕點擊事件
const onLogin = async () => {

  // 使用 async/await 進行一次性表單驗證
  await loginRef.value.validate()

  // 調用登入接口 , 發起登入請求
  await userStore.getUserInfo(loginForm.value)

  // 彈出提示框 提示用戶登入成功
  ElMessage.success('登入成功 ! 歡迎回到 Vue購物商城 !')

  // 跳轉到首頁
  router.replace('/home')

}

// 底部服務相關超連結部分
const footerHerfData = ref([
  { name : '關於我們' , href : '#'},
  { name : '幫助中心' , href : '#'},
  { name : '售後服務' , href : '#'},
  { name : '配送與驗收' , href : '#'},
  { name : '商務合作' , href : '#'},
  { name : '搜索推薦' , href : '#'},
  { name : '友情連結' , href : '#' }
])


// 服務條款部分
const isShowService = ref(false) // 控制服務條款部分的顯示隱藏

// 提示使用者部分
const isShowMsg = ref(true)

</script>
<template>
  <div class="loginPage">
    <!-- 頂部logo和進入網站首頁按鈕 -->
    <header class="login-header">
      <div class="container m-top-20 ">
        <!-- 頂部logo -->
        <h1 class="logo wow bounceInLeft">
          <RouterLink to="/">Vue購物商城</RouterLink>
        </h1>
        <!-- 進入網站首頁 -->
        <RouterLink class="entry wow bounceInRight" to="/">
          點我進入網站首頁
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>

    <!-- 中間登入表單區 -->
    <section class="login-section">
      <div class="wrapper wow zoomInLeft">
        <nav class="welcomeTitle">
          <a href="#">歡迎登入</a>
        </nav>
        <!-- 登入表單輸入區域 -->
        <div class="account-box">
          <div class="form">
            <el-form :hide-required-asterisk="true" label-position="right" label-width="40px" status-icon
              :model="loginForm" :rules="loginRules" ref="loginRef">
              <el-form-item label="帳號" prop="account">
                <el-input v-model="loginForm.account" placeholder="請輸入帳號" />
              </el-form-item>
              <el-form-item label="密碼" prop="password">
                <el-input show-password v-model="loginForm.password" placeholder="請輸入密碼" />
              </el-form-item>
              <!-- 同意條款區域 -->
              <el-form-item label-width="40px" prop="agree">
                <el-checkbox size="large" v-model="loginForm.agree">
                  我已同意 服務條款
                </el-checkbox>
                <div class="service" :isShowService="isShowService" @click="isShowService = true">點擊查看服務條款</div>
              </el-form-item>
              <!-- 點擊登入按鈕 -->
              <el-button size="large" class="subBtn" @click="onLogin">點擊登入</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    <!-- 底部服務相關超連結 -->
    <footer class="login-footer">
      <div class="container">
        <div class="footer-links">
          <router-link v-for="item in footerHerfData" :key="item.name" :to="item.href">{{ item.name }}</router-link>
        </div>
        <span class="copyright">CopyRight &copy; Vue購物商城</span>
        
      </div>
    </footer>

    <!-- 服務條款組件部分 -->
    <TermsofService v-model:isShowService="isShowService"></TermsofService>

    <!-- 提示使用者部分 -->
    <el-dialog title="提示" width="600px" v-model="isShowMsg">
      <template #default>
        <div class="msg" style="font-size: 22px; line-height: 2.5; user-select: text;">
          <p>帳號為 : heima288</p>
          <p>密碼為 : hm#qd@23!</p>
          <p style="color : red;">由於是中國的api 所以可能會有點慢 請見諒</p>
        </div>
      </template>
    </el-dialog>
  </div>
</template>


<style scoped lang='scss'>
.loginPage {
  height: 100vh;
  overflow: hidden;
  background-color: #fff;

  // 頂部LOGO部分和進入網站首頁部分
  .login-header {
    padding-top: 20px;
    background: #fff;

    .container {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .logo {
      width: 200px;

      a {
        display: block;
        height: 132px;
        width: 100%;
        text-align: center;
        background: url("../../assets/images/Vuelogo.webp") no-repeat center 18px / contain;
        color: $xtxColor;
      }
    }

    .sub {
      flex: 1;
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 38px;
      margin-left: 20px;
      color: #666;
    }

    // 進入網站首頁部分
    .entry {
      width: 240px;
      margin-bottom: 38px;
      font-size: 22px;

      i {
        font-size: 18px;
        color: $xtxColor;
        letter-spacing: -5px;
      }
    }
  }


  // 中間登入表單區
  .login-section {
    margin-top: 40px;
    background: url('@/assets/images/loginbg.webp') no-repeat center / cover;
    background-size: cover;
    height: 594px;
    position: relative;

    // 表單部分
    .wrapper {
      width: 680px;
      background: #fff;
      position: absolute;
      left: 62%;
      top: 54px;
      box-shadow: 0 0 18px 20px $xtxColor;

      // 歡迎登入文字
      .welcomeTitle {
        font-size: 14px;
        height: 100px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 0 40px;
        text-align: right;
        align-items: center;

        a {
          flex: 1;
          line-height: 1;
          display: inline-block;
          font-size: 28px;
          position: relative;
          text-align: center;
          color: $xtxColor;
        }
      }

      // 表單輸入區域
      .account-box {

        // 表單部分
        .form {
          padding: 20px 20px;

          // 服務條款
          .service {
            margin-left: 10px;
            color: #3fb984;
            padding: 2px;
            cursor: pointer;
          }
        }

      }

      // 登入按鈕部分
      .subBtn {
        background: $xtxColor;
        width: 100%;
        color: #fff;
        margin-top: 40px;
        font-size: 24px;
      }

    }

  }


  // 底部版權部分
  .login-footer {
    display: flex;
    justify-content: center;
    padding: 30px 0 50px;
    background: #fff;
    
    // 底部超連結部分
    .footer-links {
      text-align: center;
      color: #999;
      padding-top: 20px;

      a {
        line-height: 1;
        padding: 0 10px;
        color: #999;
        display: inline-block;

        ~a {
          border-left: 1px solid #ccc;
        }
      }
    }

    .copyright {
      display: block;
      text-align: center;
      color: #999;
      margin-top: 20px;
    }
  }
}
</style>