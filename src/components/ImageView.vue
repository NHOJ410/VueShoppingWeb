<script setup>
import { ref , watch } from 'vue'
// 導入 VueUse插件
import { useMouseInElement } from '@vueuse/core' // 獲取鼠標相對位置函數

// 圖片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]

// ----------- 小圖切換大圖效果 -----------
const activeIndex = ref(0) //  和滑鼠移入事件所綁定的 index值

//  滑鼠移入事件處理函數

const changeIndex = (index) => {
   
  //  將事件獲取到的 index 值 賦值給我們創建的 activeIndex
  activeIndex.value = index
}

// ----------- 放大鏡效果 -----------

const target = ref(null) // 獲取左側大圖 DOM 元素
// 獲取鼠標相對位置
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 有效範圍內的計算邏輯
const left = ref(0) // 小滑塊橫向距離
const top = ref(0)  // 小滑塊縱向距離

const largeX = ref(0) // 大圖片橫向移動距離
const largeY = ref(0) // 大圖片縱向移動距離

// 使用 watch 來監聽元素移動時的計算結果
watch([elementX , elementY , isOutside] , () => {
  
  if ( isOutside.value === false ) {
   // 有效範圍內的計算邏輯 

  // 橫向移動計算
  if ( elementX.value > 100 && elementX.value < 300 ) {
    left.value = elementX.value - 100
  }
  // 縱向移動計算
  if ( elementY.value > 100 && elementY.value < 300 ) {
    top.value = elementY.value - 100
  }

  // 邊界距離控制邏輯
  // 橫向距離控制
  if ( elementX.value > 300 )  left.value = 200 
  if ( elementX.value < 100 )  left.value = 0

  // 縱向距離控制
  if ( elementY.value > 300 )  top.value = 200 
  if ( elementY.value < 100 )  top.value = 0
  }

  // 計算右側大圖片移動距離
  largeX.value = -left.value * 2  // 大圖片橫向移動距離
  largeY.value = -top.value * 2 // 大圖片縱向移動距離 
  
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

      }]" v-show="!isOutside"></div>
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
  }

  .large {
    position: absolute;
    top: 0;
    left: 410px;
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
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      
      // 圖片激活時的效果
      &:hover,
      &.active {
        border: 2px solid $xtxColor;
        transform: translate3d(0, -2px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 40%);
        transition: all .2s;
      }
    }
  }
}
</style>
