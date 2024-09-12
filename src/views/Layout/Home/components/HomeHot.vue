<script setup>
import { ref } from 'vue'
// 導入組件
import HomePanel from '@/views/Layout/Home/components/HomePanel.vue';
// 導入 api 
import { getHotService } from '@/apis/home'; // 獲取熱門品牌數據

const hotList = ref([]) // 存儲熱門品牌數據

// 定義方法 獲取數據
const getHotList = async () => {
  const result = await getHotService()
  hotList.value = result.result
}


// 調用方法 獲取新鮮好物數據
getHotList()

</script>

<template>
  <HomePanel title="熱門品牌" subTitle="看看大家都在用哪些商品吧!">
     <!-- 主體內容模板(插槽部分) -->
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink to="/">
            <img  alt="" v-lazyLoading="item.picture"/>
            <p class="title">{{ item.title }}</p>
            <p class="alt">{{ item.alt }}</p>
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
    background: #ffffff;
    transition: all .4s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .title {
      color: $priceColor;
      font-size: 20px;
    }
    .alt {
      font-weight: 400;
    }
  }
}
</style>