import { ref } from 'vue'

// 登入表單-驗證規則 hooks
export const useFormRules = () => {
  const loginRules = ref({
    account: [
      { required: true, message: '請輸入帳號 ! ', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '請輸入密碼 ! ', trigger: 'blur' },
      { min: 6, max: 14, message: '請輸入6-14位數的密碼 ! ', trigger: 'blur' }
    ],
    agree: [
      {
        validator: (rule, value, callback) => {
          if (value) { // 如果勾選同意條款
            callback() // 通過驗證  
          } else {
            callback(new Error('請勾選同意條款 ! ')) // 未通過驗證, 提示用戶勾選同意條款
          }
        }
      }
    ]

  })

  return {
    loginRules // 表單驗證規則
  }
}