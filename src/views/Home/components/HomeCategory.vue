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
        <RouterLink :to="`/category/${item.id}`">{{ item.name }} </RouterLink>
        <RouterLink v-for="i in item.children.slice(0, 2)" :key="i.id" :to="`/category/${item.id}`">{{ i.name }}
        </RouterLink>
        <!-- 經過時觸發彈層效果 -->
        <div class="layer">
          <h4>{{ item.name }}推薦 <small>根據你的 購買/瀏覽紀錄 推薦商品</small></h4>
          <!-- 商品列表部分 -->
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink :to="`/detail/${i.id}`">
                <!-- 商品圖片 -->
                <img alt="" :src="i.picture" />
                <!-- 商品描述 -->
                <div class="info">
                  <p class="name ellipsis-2">
                    {{ i.name }}
                  </p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>$</i>{{ i.price }}元</p>
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

  // 左側商品列表
  .menu {
    li {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
        cursor: pointer;
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

      // 在 hover 狀態下 , 讓盒子顯示出來
      &:hover {
        .layer {
          display: block;
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

        // 頂部標題部分
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #505050;
          }
        }

        // 商品列表部分
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
              transform: scale(1.2);
              transition: all 0.2s ease;
              box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
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
                border-radius: 5px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;
                /* 禁止文字換行 */
                white-space: nowrap;
                /* 隱藏超出範圍的文字 */
                overflow: hidden;
                /* 文字超出時顯示省略號 */
                text-overflow: ellipsis;
                
                // 商品名
                .name {
                  font-size: 16px;
                  color: #666;
                  overflow: hidden;
                  font-weight: 700;

                }
                // 商品描述
                .desc {
                  color: #999;
                  font-size: 14px;
                }
                // 商品價格
                .price {
                  font-size: 14px;
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

      
    }
  }
}
</style>