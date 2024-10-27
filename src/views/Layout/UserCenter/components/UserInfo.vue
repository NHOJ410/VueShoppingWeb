<script setup>
import { ref, onMounted } from 'vue'
// 導入組件
import GoodsItem from '@/views/Layout/Home/components/GoodsItem.vue';
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
const titleArr = ref(['精選商品' , '優質精選' , '今日精選' , '精選推薦'])


</script>

<template>

  <!-- 頂部用戶信息 -->
  <div class="userInfo">
    <div class="user-meta">
      <!-- 用戶頭像 -->
      <div class="avatar">
        <el-avatar :size="80"
          src="https://doghealth.east.org.tw/wp-content/uploads/2022/01/750X1125-14.jpg"></el-avatar>
      </div>
      <!-- 用戶名 -->
      <h2 class="username">John</h2>
    </div>

    <!-- 右側列表部分 -->
    <div class="item">
      <a href="#">
        <span class="iconfont icon-hy"></span>
        <p>會員中心</p>
      </a>
      <a href="#">
        <span class="iconfont icon-aq"></span>
        <p>安全設置</p>
      </a>
      <a href="#">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>

  <!-- 中間 精選商品部分 -->
  <div class="like-container">
    <el-carousel height="400px" :interval="5000" arrow="never">
      <el-carousel-item v-for="(item , index) in titleArr" :key="index" >
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


<style scoped lang="scss">
// 頂部用戶信息
.userInfo {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;
  display: flex;

  // 用戶訊息部分
  .user-meta {
    flex: 1;
    display: flex;
    gap: 20px;
    align-items: center;

    .avatar {
      margin-left: 30px;
    }

    // 用戶名
    .username {
      font-size: 30px;
      color: #fff;
    }

  }

  // 右側列表部分
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    // 列表項部分

    a {
      color: white;
      font-size: 16px;
      text-align: center;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }

}

// 中間精選商品部分
.like-container {
  width: 100%;
  height: 100%;

  padding: 0 20px;

  .home-panel {
    background-color: #fff;
    height: 400px;

    // 標題部分
    .title {
      border-bottom: 1px solid #f5f5f5;
      padding: 20px 0;
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