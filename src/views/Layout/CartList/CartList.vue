<script setup>
// 導入圖標
import { CircleCheckFilled } from '@element-plus/icons-vue'

// 導入 vuerouter
import { useRouter } from 'vue-router'
const router = useRouter()

// 導入 Pinia倉庫
import { useCartStore } from '@/stores' // 導入購物車倉庫

// 定義購物車倉庫
const cartStore = useCartStore()

// --------- 點擊該項商品 跳轉到該商品頁面 -----------
const jumpToDetail = async (item) => {
  // 先詢問用戶是否要離開
  await ElMessageBox.confirm(
    `確認要去「${item.name}」的商品頁面嗎`,
    '此操作會離開購物車頁面',
    {
      confirmButtonText: '是的',
      cancelButtonText: '我再看看',
      type: 'warning',
    }
  )

  // 如果走到這裡 代表點擊的是確認 , 就跳轉到該商品頁面
  $router.push(`/detail/${item.id}`)
}

// --------- 商品選取框的事件處理函數 -----------

const handleSelect = (item, checked) => {

  // 調用倉庫方法 , 修改 cartList 的選取狀態
  cartStore.isSelected(item.skuId, checked)
}

// --------- 全選框的事件處理函數 -----------

const onCheckAll = (checked) => {
  // 調用倉庫方法 , 修改 cartList 的選取狀態 === 我們全選框的選取狀態
  cartStore.checkAll(checked)
}

// --------- 下單結算的事件處理函數 ------------

const payOrder = async () => {

  // 先詢問用戶是否確認下單
  await ElMessageBox.confirm(
    '是否確認要購買這些商品',
    '',
    {
      confirmButtonText: '是的 去買單',
      cancelButtonText: '我再想想',
      type: 'warning',
    }
  )

  // 用戶點擊確認的話  跳轉到結算頁面
  router.push('/Settlement')
}



</script>

<template>
  <div class="cart-page">
    <div class="container m-top-20">
      <!-- 購物車清單部分 -->
      <div class="cart">
        <table>
          <!-- 表頭標題 -->
          <thead>
            <tr>
              <th width="100">
                <el-checkbox :model-value="cartStore.isAllChecked" @change="onCheckAll" />
              </th>
              <th width="400">商品資訊</th>
              <th width="220">單價</th>
              <th width="180">數量</th>
              <th width="180">小計</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="item in cartStore.cartList" :key="item.id" @click="jumpToDetail(item)" class="productItem">
              <td>
                <!-- 商品列表單選框 -->
                <el-checkbox :model-value="item.selected" @change="checked => handleSelect(item, checked)" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="item.picture" alt="" /></RouterLink>
                  <!-- 商品名稱 -->
                  <div class="name">
                    <p class=" ellipsis">
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </td>
              <!-- 商品單價 -->
              <td class="tc">
                <p class="price">$ {{ Number(item.price).toFixed(0) }} 元</p>
              </td>
              <td class="tc">
                <!-- 數字框組件 -->
                <el-input-number v-model="item.count" :min="1" />
              </td>
              <!-- 商品小計 -->
              <td class="tc">
                <p class="itemTotalPrice">${{ (item.price * item.count).toFixed(0) }} 元</p>
              </td>
              <!-- 刪除按鈕部分 -->
              <td class="tc">
                <p>
                  <el-popconfirm title="確認要刪除嗎?" confirm-button-text="確認" cancel-button-text="取消"
                    @confirm="cartStore.deleteCart(item.skuId)">
                    <template #reference>
                      <a href="#">刪除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>

            <!-- 如果購物車內沒有商品 則顯示這個畫面 -->
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty>
                    <!-- 文字 -->
                    <template #description>
                      <p style="font-size: 30px;">喔不 !　找不到想要的商品嗎!?</p>
                    </template>
                    <!-- 圖片部分 -->
                    <template #image>
                      <img class="emptyImg" src="../../../assets/images/vueLoading.gif"></img>
                    </template>
                    <!-- 按鈕部分 -->
                    <el-button type="success" size="large" @click="$router.push('/')">先去隨便逛逛吧</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>


      <!-- 底部統計區域 -->
      <div class="action" v-if="cartStore.cartList.length !== 0">
        <div class="batch">
          <!-- 計算 總數量 , 選中商品總數量 區域 -->
          共 {{ cartStore.totalCount }} 件商品，已選擇 {{ cartStore.selectCount }} 件，商品合計：
          <!-- 計算總價格區域 -->
          <span class="totalPrice">$ {{ cartStore.selectPrice.toFixed(0) }} 元</span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" :icon="CircleCheckFilled" @click="payOrder">下單結算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.cart-page {
  margin-top: 20px;

  // 購物車列表部分
  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      // 表頭標題
      th {
        text-align: center;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }

      // 商品列選取的背景色
      .productItem {
        cursor: pointer;
        transition: all 0.5s ease;

        &:hover {
          background-color: rgba(197, 197, 197, 0.8);
        }

      }

      // 商品列表部分
      th,
      td {
        text-align: center;
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        // 單選框部分
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      // 商品列表內容區
      .goods {
        display: flex;
        align-items: center;

        // 商品圖片
        img {
          width: 100px;
          height: 100px;
        }

        // 商品名稱
        .name {
          width: 280px;
          font-size: 18px;
          padding-left: 10px;
        }
      }

      .tc {
        text-align: center;

        // 單項商品價格
        .price {
          font-size: 18px;
        }

        // 小計部分
        .itemTotalPrice {
          font-size: 20px;
          color: $priceColor;
        }

        // 刪除按鈕
        a {
          color: $xtxColor;
          font-size: 24px;

          &:hover {
            color: $priceColor;
            transition: all 0.4s ease;
          }
        }

      }
    }
  }




  // 購物車內沒有商品時的畫面
  .cart-none {
    width: 100%;
    height: 100%;
    text-align: center;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }

    .emptyImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }


  // 底部統計區域
  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 18px;
    justify-content: space-between;
    padding: 0 30px;

    .totalPrice {
      font-size: 24px;
      margin-right: 20px;
      font-weight: bold;
      color: $priceColor;
    }
  }
}
</style>