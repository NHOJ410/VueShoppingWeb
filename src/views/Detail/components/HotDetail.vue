<script setup>
import { ref , onMounted} from 'vue' 
import { useRoute } from 'vue-router'
// 導入 api 
import { getHotDetail } from '@/apis/detail'; // 獲取熱榜商品接口

const props = defineProps({
  // 發送請求的參數 ( 1是24小時熱榜 2是週熱榜 )
  hotType : {
    type : Number,
  },

  // 標題區域
  title : {
    type : String
  }
})


// ------- 獲取熱榜商品 ------- 
const route = useRoute()

const hotList = ref([]) // 存儲熱榜商品數據
// 發送請求 獲取熱榜商品
const getHotList = async () => {
  // 獲取24小時熱榜商品接口
  const res = await getHotDetail({ id : route.params.id , type : props.hotType , limit : 5})
  hotList.value = res.result
}
onMounted(() => {
  getHotList()
})


</script>


<template>
  <!-- 熱榜部分 -->
  <div class="goods-hot">
    <h3>{{ props.title }}</h3>
    <!-- 商品區域 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">$ {{ item.price }} </p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  width: 260px;
  margin-bottom: 20px;
  
  // 主題部分 (24小時熱榜/週熱榜)
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
    border-radius: 10px 10px 0 0 ;
  }
  
  // 內容部分
  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;
    transition: all .5s; 
    
    // 懸浮效果
    &:hover {
       @include category-Hover
    }
    
    // 圖片
    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }
    
    // 商品名稱
    .name {
      font-size: 16px;
    }
    
    // 商品描述
    .desc {
      color: #999;
      height: 29px;
    }
    
    // 商品價格
    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>