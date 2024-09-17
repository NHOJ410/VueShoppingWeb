<script setup>
// 導入 Pinia 倉庫
import { useCartStore } from '@/stores/modules/cartStore' // 導入購物車倉庫

const cartStore = useCartStore() // 定義購物車倉庫

</script>

<template>
  <!-- 購物車圖標 -->
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i><em>{{ cartStore.cartList.length }}</em>
    </a>
    <!-- 購物車內容區 -->
    <div class="layer">
      <div class="list">
        <div class="item" v-for="item in cartStore.cartList" :key="item">
          <RouterLink to="">
            <img :src="item.picture" alt="" />
            <div class="center">
              <p class="name ellipsis-2">
                {{ item.name }}
              </p>
              <p class="attr ellipsis">{{ item.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">${{ item.price }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <!-- 刪除按鈕 -->
          <i class="iconfont icon-close-new" @click="cartStore.deleteCart(item.skuId)"></i>
        </div>
       
      </div>
      <!-- 底部商品總計 -->
      <div class="foot" v-if="cartStore.cartList.length !== 0">
        <div class="total">
          <p>共 {{ cartStore.totalCount }} 件商品</p>
          <p>$ {{ cartStore.totalPrice.toFixed(0) }} </p>
        </div>
        <el-button size="large" type="primary" >去購物車結算</el-button>
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
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 2px 6px;
      line-height: 1;
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
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
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 600px;
    height: 400px;
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
     
    // 底部結算區域
    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;
       
        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }
  
  // 購物車內容區
  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 10px;
      position: relative;

      i {
        position: absolute;
        bottom: 38px;
        right: 20px;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
        font-size: 25px;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
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
}
</style>