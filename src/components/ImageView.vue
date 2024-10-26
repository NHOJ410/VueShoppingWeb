<script setup>
import { ref , watch , computed } from 'vue'
// 導入 VueUse插件
import { useMouseInElement } from '@vueuse/core' // 獲取鼠標相對位置函數

// 通過 defineProps 來接收父組件傳遞過來的圖片列表數據來做渲染
defineProps({
  imageList : {
    type : Array,
    default : () => []  
  }
})


// ----------- 小圖切換大圖效果 -----------
const activeIndex = ref(0) //  和滑鼠移入事件所綁定的 index值

//  滑鼠移入事件處理函數

const changeIndex = (index) => {
   
  //  將事件獲取到的 index 值 賦值給我們創建的 activeIndex
  activeIndex.value = index
}

// ----------- 放大鏡效果 -----------

const target = ref(null) // 獲取左側大圖 DOM 元素
// 使用 VueUse獲取鼠標相對位置
const { elementX, elementY, isOutside } = useMouseInElement(target)


const left = computed(() => {
  if (isOutside.value) return 0
  if (elementX.value > 300) return 200
  if (elementX.value < 100) return 0
  return elementX.value - 100
})

const top = computed(() => {
  if (isOutside.value) return 0
  if (elementY.value > 300) return 200
  if (elementY.value < 100) return 0
  return elementY.value - 100
})

const largeX = computed(() => -left.value * 2)
const largeY = computed(() => -top.value * 2)

// 只需要監聽 isOutside 的變化，其他計算會自動更新
watch(isOutside, () => {
  if (isOutside.value === false) {
    // 如果範圍內的其他操作可以放在這裡
  }
})


</script>

<template>
  <h2>移動到圖片內部即可放大檢視商品</h2>
  <div class="goods-image">
    <!-- 左側大圖 -->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 放大鏡濛層 -->
      <div :class="{ layer : !isOutside }" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>

    <!-- 小圖列表 -->
    <ul class="small">
      <li v-for="(img, index) in imageList" :key="index" @mouseenter="changeIndex(index)" :class="{ active: activeIndex === index }">
        <img :src="img" alt="" />
      </li>
    </ul>

    <!-- 放大鏡大圖 -->
    <div class="large" :style="[{
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${largeX}px`,
        backgroundPositionY: `${largeY}px`,
      }]" v-show="!isOutside">
    </div>
  </div>
</template>

<style scoped lang="scss">

.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  
  
  // 左側大圖片
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    cursor: none;
  }

  .large {
    position: absolute;
    top: 0;
    left: 405px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景圖:盒子的大小 = 2:1  將來控制背景圖的移動來實現放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  
  // 小滑塊樣式
  .layer {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    // 絕對定位 然後跟隨滑鼠控制left和top屬性即可讓滑塊移動
    left: 0;
    top: 0;
    position: absolute;
  }
  // 右側小圖片列表
  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 16px;
      margin-bottom: 15px;
      cursor: pointer;
      
      // 圖片激活時的效果
      &:hover,
      &.active {
        transform: scale(1.2);
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
        transition: all .3s;
      }
    }
  }
}
</style>
