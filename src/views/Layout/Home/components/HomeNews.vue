<script setup>
import { ref } from 'vue'
// 導入組件
import HomePanel from '@/views/Layout/Home/components/HomePanel.vue';
// 導入 api 
import { getNewsService } from '@/apis/home'; // 獲取新鮮好物數據

const newsList = ref([]) // 存儲新鮮好物數據

// 定義方法 獲取數據
const getNewsList = async () => {
  const result = await getNewsService(8)
  newsList.value = result.result
}

// 調用方法 獲取新鮮好物數據
getNewsList()

</script>

<template>
  <HomePanel title="新鮮好物" subTitle="新鮮出爐  每日精選">
     <!-- 主體內容模板(插槽部分) -->
      <ul class="goods-list">
        <li v-for="item in newsList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img v-lazyLoading="item.picture" alt=""/>
            <p class="name">{{ item.name }}</p>
            <p class="price">$ {{ item.price }}元</p>
          </RouterLink>
        </li>
      </ul>
  </HomePanel>
</template>

<style lang="scss" scoped>
// 主體內容部分
  .goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  
  li {
    width: 306px;
    height: 406px;
    transition: all .4s;
    margin-top: 15px;

    &:hover {
      @include category-Hover
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 18px;
      padding: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>