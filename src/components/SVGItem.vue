<script setup>
// 接收父組件傳遞過來的svg圖標及樣式
defineProps({
  // svg名稱
  svgName : {
    type : String
  },
  // svg顏色
  svgColor : {
    type : String,
    default : '#000'
  },
  // svg寬度
  width : {
    type : String,
    default : '16px'
  },
  // svg長度
  height : {
    type : String,
    default : '16px'
  }
  
})
  
</script>

<template>
  <div>
    <svg :style="{width , height}">
       <use :xlink:href="`#icon-${svgName}`" :fill="svgColor"></use>
    </svg>
  </div>
</template>

<style lang="scss" scoped>

</style>