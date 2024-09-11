<script setup>
// 導入 Pinia倉庫
import { useCategoryStore } from '@/stores'

const categoryStore = useCategoryStore() // 定義商品分類倉庫


</script>

<template>
  <div class="home-category">
    <!-- 左側商品列表主體 -->
    <ul class="menu">
      <li v-for="item in categoryStore.categoryNav" :key="item.id">
        <RouterLink to="/">{{ item.name }} </RouterLink>
        <RouterLink v-for="i in item.children.slice(0,2)" :key="i.id" to="/">{{ i.name }} </RouterLink>
        <!-- 經過時觸發彈層效果 -->
        <div class="layer">
          <h4>分類推薦 <small>根據你的購買或瀏覽紀錄推薦商品</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img alt="" :src="i.picture"/>
                <div class="info">
                  <p class="name ellipsis-2">
                    {{ i.name }}
                  </p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>$</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(173, 172, 172, 0.9);
  position: relative;
  z-index: 99;
  border-radius: 10px;
  // 左側商品列表
  .menu {
    li {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
        border-radius: 4px;
      }

      a {
        margin-right: 4px;
        color: #fff;
        font-weight: 550;

        &:first-child {
          font-size: 16px;
          margin-right: 10px;
        }
      }
      
      // 經過時觸發彈層效果
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 8px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            &:hover {
                background: #c0fff0;
              }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              overflow: hidden;           

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 14px;
                  color: #666;
                  overflow: hidden;
                  font-weight: 700;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 18px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 在 hover 狀態下 , 讓盒子顯示出來
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>