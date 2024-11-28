<script setup>
import { ref, onMounted } from 'vue'
// 導入商品組件
import GoodsItem from '@/components/GoodsItem.vue';
// 導入 api 
import { getLikeListAPI } from '@/apis/userCenter';

// --------------- 渲染猜你喜歡商品部分 ------------------
const likeList = ref([]) // 存儲猜你喜歡商品數據

// 定義方法 調用接口 獲取數據
const getLikeList = async () => {

  const res = await getLikeListAPI({ limit: 4 })

  likeList.value = res.result

}

onMounted(() => {
  getLikeList()
})

// 精選商品的標題部分(用來輪播用)
const titleArr = ref(['精選商品', '優質精選', '今日精選', '精選推薦'])
</script>

<template>
  <div class="box">
    <el-carousel height="400px" :interval="5000" arrow="never">
      <el-carousel-item v-for="(item, index) in titleArr" :key="index">
        <div class="home-panel">
          <div class="title">
            <h4>{{ item }}</h4>
          </div>
          <div class="goods-list">
            <GoodsItem v-for="item in likeList" :key="item.id" :good="item" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.box {
  .home-panel {
  background-color: #fff;
  height: 400px;

  // 標題部分
  .title {
    border-bottom: 1px solid #f5f5f5;
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;

    h4 {
      font-size: 24px;
      font-weight: 500;
    }

  }

  // 商品列表部分
  .goods-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
  }
}
}
</style>