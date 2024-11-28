<script setup>

defineProps({
  categoryList : {
    type : Object
  }
})

</script>

<template>
  <div class="box">
    <!-- 頂部大標題和商品分類導航 -->
    <h3>全部分類</h3>
        <ul>
          <li v-for="item in categoryList.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink> 
          </li>
        </ul>
  </div>
</template>

<style lang="scss" scoped>
 .box {
  // 全部分類文字樣式
  h3 {
      font-size: 28px;
      color: #666;
      font-weight: 500;
      text-align: center;
      line-height: 100px;
    }

    // 商品列表部分
    ul {
      display: flex;
      padding: 10px 30px;
      justify-content: center;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;
        transition: all .3s;
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
        }
       // 內容樣式
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          padding-top: 10px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 3.8;
          }

          &:hover {
            color: $xtxColor;
          }
        }

       
      }
    }
 }
</style>