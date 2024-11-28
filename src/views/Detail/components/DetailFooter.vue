<script setup>
import HotDetail from '@/views/Detail/components/HotDetail.vue' // 導入熱榜組件

defineProps({
  detailData: {
    type: Object
  }
})

</script>

<template>
  <!-- 底部商品展示部分 -->
  <div class="goods-article">
    <!-- 商品詳情標題 -->
    <div class="goods-tabs">
      <nav>
        <p>商品詳情</p>
      </nav>
      <!-- 商品詳情介紹 -->
      <div class="goods-detail">
        <ul class="attrs">
          <li v-for="item in detailData.details.properties" :key="item.value">
            <!-- 商品介紹 -->
            <span class="dt">{{ item.name }}</span>
            <span class="dd">{{ item.value }}</span>
          </li>
        </ul>
        <!-- 商品圖片 -->
        <img v-for="item in detailData.details.pictures" :key="item" v-lazyLoading="item" alt="">
      </div>
    </div>
  </div>

  <!-- 24小時 + 週 熱榜商品推薦 -->
  <div class="goods-aside">
    <!-- 24小時熱榜商品 -->
    <HotDetail :hotType="1" :title="'24小時熱榜商品'"></HotDetail>
    <!-- 周熱榜商品 -->
    <HotDetail :hotType="2" :title="'本週熱榜商品'"></HotDetail>
  </div>
</template>

<style lang="scss" scoped>
.goods-article {
  min-width: 940px;
  margin-right: 30px;

  // 商品展示標題部分
  .goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
      height: 70px;
      line-height: 70px;
      display: flex;
      border-bottom: 1px solid #f5f5f5;

      p {
        padding: 0 30px;
        font-size: 18px;
        position: relative;
      }
    }

    // 商品詳情介紹部分
    .goods-detail {
      padding: 30px;

      .attrs {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 50px;
          gap: 5px;
          .dt {
            font-size: 16px;
            width: 120px;
            color: $xtxColor;
            font-weight: 650;
          }

          .dd {
            font-size: 14px;
            flex: 1;
            color: #666;
            font-weight: 700;  
          }
        }
      }

      // 商品詳情圖片區域
      >img {
        width: 100%;
      }
    }
  }

  // 24小時 週榜 熱榜區域
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>