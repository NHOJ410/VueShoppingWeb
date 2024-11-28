<script setup>
// 導入組件
import RecommendedProducts from '@/components/RecommendedProducts.vue'

// 用戶訊息 - 右側列表部分數據
const itemList = [
  {
    title: '會員中心',
    icon: 'icon-hy'
  },
  {
    title: '安全設置',
    icon: 'icon-aq'
  },
  {
    title: '地址管理',
    icon: 'icon-dw'
  }
]

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
      <router-link to="#" v-for="item in itemList" :key="item.title">
        <span :class="`iconfont ${item.icon}`"></span>
        <p>{{ item.title }}</p>
      </router-link>
    </div>
  </div>

  <!-- 中間 精選商品輪播圖部分 -->
  <div class="like-container">
    <RecommendedProducts></RecommendedProducts>
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
}
</style>