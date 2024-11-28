<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()



</script>

<template>
  <div class="box">
    <el-button type="success" size="large" @click="router.go(-1)" class="backBtn">點我回上一頁</el-button>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/notFound.webp') no-repeat center / contain;
    background-color: #addd9a;
    position: relative;
    .backBtn {
      width: 20vw;
      position: absolute;
      margin-top: 10px;
      top: 15%;
      left: 51.2%;
      transform: translate(-50%, 0);
      animation: hint 1.5s infinite linear;
      font-size: 30px
    }
  }
  
  // 按鈕動畫
  @keyframes hint {
  
    0% {
      opacity: 1;
    }

    25% {
      opacity: 0.25;
    }

    50% {
      opacity: 0.5;
    }

    75% {
      opacity: 0.75;
    }
  
    100% {
      opacity: 1;
    }
  }
</style>