<script setup>
import { ref } from 'vue'

// ------------- 登入表單 -------------

// 登入表單-輸入框
const loginForm = ref({
  account : '',
  password:'',
  agree : false
})

// 登入表單-驗證規則
const loginRules = ref({
  account : [
    { required : true, message : '請輸入帳號 ! ', trigger : 'blur' }
  ],
  password:[
    { required : true, message : '請輸入密碼 ! ', trigger : 'blur' },
    { min : 6 , max : 14 , message : '請輸入6-14位數的密碼 ! ', trigger : 'blur' }
  ],
  agree : [
    { 
      validator : (rule, value, callback) => {
        if ( value ) { // 如果勾選同意條款
          callback() // 通過驗證  
        } else {
          callback(new Error('請勾選同意條款 ! ')) // 未通過驗證, 提示用戶勾選同意條款
        }
      }
    }
  ]
  
})

// 獲取 登入表單實例對象
const loginRef = ref(null)

// 登入按鈕點擊事件

const onLogin = async  () => {

  // 使用 async/await 進行一次性表單驗證
  await loginRef.value.validate()
  
  // 只要沒有通過驗證 , 就不會執行下列操作
  console.log('後續的登入操作');
}

</script>
<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <!-- 頂部logo -->
        <h1 class="logo">
          <RouterLink to="/">小兔鮮</RouterLink>
        </h1>
        <!-- 進入網站首頁 -->
        <RouterLink class="entry" to="/">
          進入網站首頁
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">歡迎登入</a>
        </nav>
        <!-- 登入表單輸入區域 -->
        <div class="account-box">
          <div class="form">
            <el-form label-position="right" label-width="60px" status-icon :model="loginForm" :rules="loginRules" ref="loginRef">
              <el-form-item label="帳號" prop="account">
                <el-input v-model="loginForm.account" />
              </el-form-item>
              <el-form-item label="密碼" prop="password">
                <el-input v-model="loginForm.password" />
              </el-form-item>
              <!-- 同意條款區域 -->
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox size="large" v-model="loginForm.agree">
                  我已同意 隱私條款和服務條款
                </el-checkbox>
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
        <p>
          <a href="javascript:;">關於我們</a>
          <a href="javascript:;">幫助中心</a>
          <a href="javascript:;">售後服務</a>
          <a href="javascript:;">配送與驗收</a>
          <a href="javascript:;">商務合作</a>
          <a href="javascript:;">搜索推薦</a>
          <a href="javascript:;">友情連結</a>
        </p>
        <p>CopyRight &copy; 小兔鮮兒</p>
      </div>
    </footer>
  </div>
</template>


<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

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
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
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

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 480px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
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
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
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
}
// 表單輸入區域
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
  margin-top: 40px;
}
</style>