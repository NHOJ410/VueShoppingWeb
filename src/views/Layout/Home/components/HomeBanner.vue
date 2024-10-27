<script setup>
import { onMounted, ref } from 'vue';
// 導入api
import { getBannerService } from '@/apis/home'

const bannerList = ref([]) // 存儲輪播圖數據

// 獲取輪播圖數據
const getBanner = async () => {
  const result = await getBannerService(1)
  bannerList.value = result.result
}

// 由於需要操作 DOM 所以在 onMounted() 鉤子中調用接口 獲取數據
onMounted(() => {
  getBanner() // 獲取輪播圖數據
})


</script>

<template>
  <div class="home-banner ">
    <el-carousel height="500px" :motion-blur="true">
      <el-carousel-item v-for="item in bannerList" :key="item.id" interval="2000" motion-blur="true">
        <router-link :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="">
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <!-- 查看更多 -->
    <div class="more">
      <router-link to="/category/sub/1005000">點我查看更多</router-link>
    </div>
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
    position: relative;
  }

  // 加大輪播圖的箭頭樣式
  :deep(.el-carousel__arrow) {
    font-size: 30px;
    color: #ffffff;
  }

  .more {
    cursor: pointer;
    width: 150px;
    height: 30px;
    margin: 20px;
    font-weight: 550;
    text-align: center;
    line-height: 1.5;
    border-radius: 5px;
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 18px;
    background: linear-gradient(to bottom, #b2fefa, #0ed2f7);

    &:hover {
      transform: scale(1.2);
      transition: all 0.5s ease;
    }
  }

}
</style>