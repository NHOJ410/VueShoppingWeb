<script setup>
import { onMounted, ref } from 'vue';
// 導入api
import { getBannerService } from '@/apis/home'; // 導入輪播圖數據

const bannerList = ref([])

// 獲取輪播圖數據
const getBanner = async () => {
  const result = await getBannerService(1)
  bannerList.value = result.data.result
}

// 由於需要操作 DOM 所以在 onMounted() 鉤子中調用接口 獲取數據
onMounted(() => {
  getBanner() // 獲取輪播圖數據
})

</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id" interval="2000" motion-blur="true">
          <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  border-radius: 10px;
  
  // 輪播圖裡面的圖片大小
  img {
    width: 100%;
    height: 500px;
    border-radius: 10px;
  }
  
  // 加大輪播圖的箭頭樣式
  :deep(.el-carousel__arrow) {
    font-size: 30px;
    color: #ffffff;
  }
}
</style>