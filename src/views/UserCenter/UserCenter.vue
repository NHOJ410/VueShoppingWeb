<script setup></script>

<template>
  <div class="container">

    <!-- 左側tab欄 -->
    <div class="xtx-member-aside">
      <div class="user-manage">
        <h4>我的資料</h4>
        <div class="links">
          <RouterLink to="/userCenter/user">個人中心</RouterLink>
        </div>
        <h4>交易管理</h4>
        <div class="links">
          <RouterLink to="/userCenter/order">我的訂單</RouterLink>
        </div>
      </div>
    </div>

    <!-- 右側內容區 -->
    <div class="article">
      <!-- 三級路由的展示的地方 -->
      <RouterView />
    </div>
  </div>
</template>


<style scoped lang="scss">
.container {
  width: 1440px;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  gap: 40px;

  // 左側tab欄部分
  .xtx-member-aside {
    width: 180px;
    text-align: center;
    background-color: #fff;

    .user-manage {
      background-color: #fff;

      

      // tab欄標題
      h4 {
        font-size: 17px;
        font-weight: 400;
        padding: 20px 52px 5px;
      }
  
      // tab欄連結部分
      .links {
        border-bottom: 1px solid #f6f6f6;

        a {
          display: block;
          line-height: 1;
          padding: 30px 0;
          font-size: 14px;
          color: #666;
          position: relative;

          &:hover {
            transform: scale(1.3);
            color: $mainColor;
            transition: all 0.3s ease;
          }
          &.router-link-exact-active {
            color: $mainColor;
          }
        }
      }


    }
  }


  // 右側內容區部分
  .article {
    flex: 1;
    background-color: #fff;
  }
}
</style>