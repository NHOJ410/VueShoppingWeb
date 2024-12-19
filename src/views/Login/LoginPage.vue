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
import { useThrottleFn } from '@vueuse/core'  // 導入 vueUse的節流函數
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

// 提示帳號部分
const hintAccount = useThrottleFn(() => {
  ElNotification({
    title: '提示',
    message: '帳號為 : heima288',
    type: 'success',
    duration: 5000,
    customClass: 'hint-Item'
  })
}, 5000)  // 5秒內最多執行一次

// 提示密碼部分
const hintPassword = useThrottleFn(() => {
  ElNotification({
    title: '提示',
    message: '密碼為 : hm#qd@23!',
    type: 'success',
    duration: 5000,
    customClass: 'hint-Item'
  })
}, 5000)  // 5秒內最多執行一次

// 底部服務相關超連結部分
const footerHerfData = ref([
  { name: '關於我們', href: '#' },
  { name: '幫助中心', href: '#' },
  { name: '售後服務', href: '#' },
  { name: '配送與驗收', href: '#' },
  { name: '商務合作', href: '#' },
  { name: '搜索推薦', href: '#' },
  { name: '友情連結', href: '#' }
])


// 服務條款部分
const termsofServiceRef = ref(null) // 服務條款組件實例對象

// 顯示服務條款
const onShowTermsofService = () => {
  termsofServiceRef.value.onShow()
}


</script>
<template>
  <div class="loginPage">
    <!-- 頂部logo和進入網站首頁按鈕 -->
    <header class="login-header">
      <div class="container">
        <!-- 頂部logo -->
        <h1 class="logo wow bounceInLeft">
          <SVGItem :svgName="'vueLogo'" width="100px" height="100px"></SVGItem>
          <strong>Vue購物商城</strong>
        </h1>
        <!-- 進入網站首頁 -->
        <RouterLink class="entry wow bounceInRight" to="/home">
          點我進入網站首頁
          <i class="iconfont icon-icon-angle-right"></i>
          <i class="iconfont icon-icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>

    <!-- 中間登入表單區 -->
    <section class="login-section">
      <div class="web-description">
        <SVGItem :svgName="'Pinia'" width="300px" height="300px"></SVGItem>
        <h2>Vue購物商城</h2>
        <p>快速購物極致體驗</p>
        <p>省時又省力隨心購好物</p>
      </div>
      <div class="wrapper wow zoomInLeft">
        <div class="welcomeTitle">
          <h2>歡迎登入</h2>
        </div>
        <!-- 登入表單輸入區域 -->
        <div class="account-box">
          <div class="form">
            <el-form :hide-required-asterisk="true" label-position="right" label-width="40px" status-icon
              :model="loginForm" :rules="loginRules" ref="loginRef">
              <el-form-item label="帳號" prop="account">
                <el-input v-model="loginForm.account" placeholder="請輸入帳號" @focus="hintAccount"/>
              </el-form-item>
              <el-form-item label="密碼" prop="password">
                <el-input show-password v-model="loginForm.password" placeholder="請輸入密碼" @focus="hintPassword" />
              </el-form-item>
              <!-- 同意條款區域 -->
              <el-form-item label-width="40px" prop="agree">
                <el-checkbox size="large" v-model="loginForm.agree">
                  我已同意 服務條款
                </el-checkbox>
                <div class="service" @click="onShowTermsofService">點擊查看服務條款</div>
              </el-form-item>
              <!-- 點擊登入按鈕 -->
              <el-button size="large" class="subBtn" @click="onLogin">登入</el-button>
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
    <TermsofService ref="termsofServiceRef"></TermsofService>

  </div>
</template>


<style scoped lang='scss'>
.loginPage {
  height: 100vh;
  margin-top: -40px;
  overflow: hidden;
  background-color: #fff;


  // 頂部LOGO部分和進入網站首頁部分
  .login-header {
    background: #fff;

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // logo部分
      .logo {
        width: 400px;
        display: flex;
        align-items: center;
        
        // logo文字部分
        strong {
          font-size: $mainFontSize;
          color: $mainColor;
        }
      }

      // 進入網站首頁部分
      .entry {
        width: 240px;
        font-size: $smallFontSize;
        font-weight: 300;
        
        // 進入網站首頁圖標部分
        i {
          font-size: 0.8em;
          color: $mainColor;
          letter-spacing: -5px;
        }
      }
    }


  }


  // 中間登入表單區
  .login-section {
    background-color: $mainColor;
    background-size: cover;
    height: 594px;
    position: relative;

    // 網站描述部分
    .web-description {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: $thirdFontSize;
      color: #fff;

      p {
        letter-spacing: 10px;
        line-height: 1.5;
      }
    }

    // 表單部分
    .wrapper {
      width: 500px;
      background: #fff;
      position: absolute;
      left: 70%;
      top: 15%;
      box-shadow: 0 0 4px 4px rgba(#dee2e6,0.3);

      // 歡迎登入文字
      .welcomeTitle {
        height: 100px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;

        h2 {
          flex: 1;
          font-size: $secFontSize;
          text-align: center;
          color: $mainColor;
        }
      }

      // 表單輸入區域
      .account-box {
        // 表單部分
        .form {
          padding: 20px 40px;

          // 服務條款文字
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
        background: $mainColor;
        width: 100%;
        color: #fff;
        margin-top: 40px;
        font-size: $smallFontSize;
        padding : 20px 0;
      }

    }

  }

 
  // 底部版權部分
  .login-footer {
    margin-top: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 30px 0 50px;
    background: #fff;

    // 底部超連結部分
    .footer-links {
      letter-spacing: 5px;
      font-size: $miniFontSize;
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
    
    // 版權文字部分
    .copyright {
      display: block;
      text-align: center;
      color: #999;
      margin-top: 40px;
    }
  }
}
</style>

<style lang="scss">
// 表單輸入時的提示框樣式
.hint-Item.el-notification{
  .el-notification__content {
    font-size: $miniFontSize;
    letter-spacing: 1px;
  }
}
</style>
