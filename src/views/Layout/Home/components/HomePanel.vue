<script setup>

// 使用 defineProps接收父組件傳遞來的數據
defineProps({
  // 一級標題
  title : {
    type : String
  },
  // 二級標題
  subTitle : {
    type : String
  }
  
})

</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 上方標題區域 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主體內容部分 -->
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;
  // 上方標題區域
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    
    // 主標題
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: 700;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      // 副標題
      small {
        font-weight: 600;
        font-size: 18px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>