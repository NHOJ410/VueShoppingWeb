<script setup>
import { ref , computed } from 'vue'
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
const activeImageIndex = ref(0) //  和滑鼠移入事件所綁定的 index值

//  滑鼠移入事件處理函數

const enterImage = (index) => {
   
  //  將事件獲取到的 index 值 賦值給我們創建的 activeIndex
  activeImageIndex.value = index
}



// ----------- 放大鏡效果 -----------
const middleImage = ref(null) // 獲取左側大圖 DOM 元素
// 使用 VueUse獲取左側大圖的鼠標相對位置 「X軸 , Y軸 , 是否移出左側大圖範圍」
const { elementX, elementY, isOutside } = useMouseInElement(middleImage)

/*
  『左側小滑塊』有效範圍移動和邊界距離控制 計算邏輯「小滑塊移動距離」「小滑塊面積 400*400」 

  「有效範圍」
  (1) 100 <  elementX < 300 , left = elementX - 小滑塊寬度的一半「100」
  (2) 100 <  elementY < 300 , top = elementY - 小滑塊高度的一半「100」

  「邊界距離控制」
  (1) elementX > 300 , left = 200 ,  elementX < 100 , left = 0
  (2) elementY > 300 , top = 200 ,  elementY < 100 , top = 0

*/
// 獲取 「濛層 X軸 有效範圍偏移量」
const left = computed(() => { 
  if (isOutside.value) return 0 // 如果是在外面的話 歸0
  if (elementX.value > 300) return 200 // 如果滑鼠X軸移動「大於300」返回200
  if (elementX.value < 100) return 0   // 如果滑鼠X軸移動「小於100」歸 0
  return elementX.value - 100 // 設定初始值「可移動範圍」
})

// 獲取 「濛層 Y軸 有效範圍偏移量」
const top = computed(() => {
  if (isOutside.value) return 0 // 如果是在外面的話 歸0
  if (elementY.value > 300) return 200 // 如果滑鼠Y軸移動「大於300」返回200
  if (elementY.value < 100) return 0 // 如果滑鼠Y軸移動「小於100」歸 0
  return elementY.value - 100 // 設定初始值 「可移動範圍」
})


/*
  『右圖放大鏡大圖展示 ( 2倍放大 ) 』
   根據我們計算出來的 「小滑塊距離」來做處理 ( 其實就是 * 2 因為我們圖片兩倍放大 )
   注意要用「負數」因為我們滑塊往下 , 圖片是往上
*/
const largeX = computed(() => -left.value * 2) // 放大鏡效果圖 X軸移動距離
const largeY = computed(() => -top.value * 2)  // 放大鏡效果圖 Y軸移動距離


</script>

<template>
  <h2>移動到圖片內部即可放大檢視商品⤵️</h2>
  <div class="goods-image">
    <!-- 左側大圖 -->
    <div class="middleImage" ref="middleImage">
      <img :src="imageList[activeImageIndex]" alt="" />
      <!-- 放大鏡濛層 「當滑鼠移入左側大圖時出現」-->
      <div :class="{ layer : !isOutside }"  :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>

    <!-- 小圖列表 -->
    <ul class="smallImgList">
      <li v-for="(img, index) in imageList" :key="img" @mouseenter="enterImage(index)" :class="{ active: activeImageIndex === index }">
        <img :src="img" alt="" />
      </li>
    </ul>

    <!-- 放大鏡大圖 --> 
    <div class="largeImage" :style="[{
        backgroundImage: `url(${imageList[activeImageIndex]})`,
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
  .middleImage {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    cursor: none;
  }
  
  // 右側放大鏡展示圖片
  .largeImage {
    position: absolute;
    top: 0;
    left: 405px;
    width: 400px;
    height: 400px;
    z-index: 998;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-color: #f8f8f8;
    // 圖片大小 = 2:1  將來控制背景圖的移動來實現放大的效果查看
    background-size: 200% , 200%;
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
  .smallImgList {
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
