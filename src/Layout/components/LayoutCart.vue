<script setup>
import { ref, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
// 導入 路由方法
import { useRouter } from 'vue-router'
const router = useRouter()
// 導入 Pinia 倉庫
import { useCartStore } from '@/stores/modules/cartStore' // 導入購物車倉庫
const cartStore = useCartStore() // 定義購物車倉庫


// 導入 hooks
import { useWowPlugin } from '@/composables/useWowPlugin.js' // wow.js插件
// wow.js插件效果
useWowPlugin()

// 用來配合 :key 來刷新購物車數量的 id , 重新渲染讓動畫刷新
let keyId = ref(0)

watch(() => cartStore.cartList.length, () => {
   
  keyId.value += 1

})


</script>

<template>
  <!-- 購物車圖標 -->
  <div class="cart">
    <div class="curr">
      <i class="iconfont icon-cart"></i><em class="wow backInDown" :key="keyId"
        v-show="cartStore.cartList.length !== 0">{{ cartStore.cartList.length }}</em>
    </div>
    <!-- 購物車內容區 -->
    <div class="layer" v-show="cartStore.cartList.length !== 0">
      <!-- 每一項商品 -->
      <div class="list">
        <div class="item" v-for="item in cartStore.cartList" :key="item">
          <RouterLink :to="`/detail/${item.id}`">
            <img :src="item.picture" alt="" />
            <div class="center">
              <!-- 商品名 -->
              <p class="name ">
                {{ item.name }}
              </p>
              <!-- 規格名 -->
              <p class="attr ">{{ item.attrsText }}</p>
            </div>
            <!-- 價格和數量 -->
            <div class="right">
              <p class="price">${{ item.price }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <!-- 刪除按鈕 -->
          <el-button class="deleteBtn"  :icon="Delete" type="danger" @click="cartStore.deleteCart(item.skuId)">刪除此商品</el-button>
        </div>

      </div>
      <!-- 底部商品總計 -->
      <div class="foot">
        <div class="total">
          <p>共 {{ cartStore.totalCount }} 件商品</p>
          <p>總共 : $ {{ cartStore.totalPrice.toFixed(0) }} 元</p>
        </div>
        <el-button size="large"  type="primary" @click="router.push('/cartList')">去購物車結算</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 購物車主體
.cart {
  width: 50px;
  position: relative;
  z-index: 600;
  
  // 購物車圖標部分
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;

    .icon-cart {
      font-size: 22px;
    }

    // 購物車顯示數量
    em {
      position: absolute;
      right: 0;
      top: 0;
      padding: 2px 4px;
      line-height: 1;
      background: red;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
    }
  }

  // 購物車內容區 - 滑鼠移入後 展示購物車的效果
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  // 購物車內容區
  .layer {
    width: 700px;
    height: 400px;
    opacity: 0;
    transition: all 0.4s ease-in-out;
    transform: translateY(-200px) scale(1, 0);
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;

    // 購物車內容區 - 頂部尖頭
    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }

    // 購物車內容區
    .list {
      height: 310px;
      overflow: auto;
      padding: 0 10px;

      // 每一項商品
      .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        margin-top: 10px;
        padding: 10px 10px;
        position: relative;
     
        &:hover {
          background: lighten($mainColor, 50%);
        }

        // 商品主體內容
        a {
          display: flex;
          align-items: center;

          // 商品圖片
          img {
            height: 80px;
            width: 80px;
          }

          // 商品名稱和規格區域
          .center {
            padding: 0 10px;
            width: 300px;

            // 商品名稱 
            .name {
              font-size: 16px;
            }
            // 商品規格 
            .attr {
              color: #999;
              padding-top: 5px;
            }

          }

          // 右側商品價格和數量區域
          .right {
            width: 200px;
            padding-right: 20px;
            text-align: center;

            // 商品價格

            .price {
              font-size: 16px;
              color: $priceColor;
            }

            // 商品數量
            .count {
              color: #000000;
              margin-top: 5px;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }

        
      }
    }

    // 底部結算區域
    .foot {
      display: flex;
      justify-content: flex-end;
      gap : 20px;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 20px;
      background: #f8f8f8;

      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;
        display: flex;
        gap: 30px;
        align-items: center;

        p {
          &:first-child {
            font-size: 16px;
          }

          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }


}
</style>