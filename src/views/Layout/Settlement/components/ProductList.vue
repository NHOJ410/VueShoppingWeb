<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 接收父組件傳遞過來的商品數據
defineProps({
  // 訂單數據
  orderData :{
    type : Object,
    default : () => ({})
  }
})


// 點擊後跳轉到商品詳情頁
const jumpToDetail = async (item) => {

  // 先詢問用戶使否要跳轉
  await ElMessageBox.confirm(
    `請問要跳轉到「${item.name}」商品頁面嗎?`,
    '此操作將會離開支付頁面',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  
  // 走到這裡代表點擊確定 , 那就跳轉到該商品頁面
  router.push(`/detail/${item.id}`)
}

</script>

<template>
  <!-- 結算商品清單部分 -->
  <div class="productList">
    <table class="goods">
      <!-- 頂部標題 -->
      <thead>
        <tr>
          <th class="productName" width="520">商品名稱</th>
          <th width="170">單價</th>
          <th width="170">數量</th>
          <th width="170">小計</th>
          <th width="170">實付</th>
        </tr>
      </thead>
      <!-- 每一項商品資料 -->
      <tbody>
        <tr v-for="item in orderData.goods" :key="item.id" @click="jumpToDetail(item)">
          <!-- 商品名稱和商品規格 -->
          <td>
            <div class="info">
              <img :src="item.picture" alt="">
              <div class="right">
                <p>{{ item.name }}</p>
                <p>{{ item.attrsText }}</p>
              </div>
            </div>
          </td>
          <!-- 單價 -->
          <td> $ {{ Number(item.price).toFixed(0) }} 元</td>
          <!-- 數量 -->
          <td>{{ item.count }} 件</td>
          <!-- 小計區域 -->
          <td> $ {{ Number(item.totalPrice).toFixed(0) }} 元</td>
          <!-- 實付區域 -->
          <td class="pay"> $ {{ Number(item.totalPayPrice).toFixed(0) }} 元</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.productList {
  .goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    tr {
      cursor: pointer;
      
      &:hover {
        background: #f5f5f5;
      }

      // 頂部標題
      th {
        background: #f5f5f5;
        font-weight: normal;
        padding: 20px;
        font-size: 16px;
      }
      
      // 商品資料區域
      .info {
        display: flex;
        text-align: left;

        // 商品圖片
        img {
          width: 70px;
          height: 70px;
          margin-right: 20px;
        }

        // 商品名稱和商品規格
        .right {
          line-height: 24px;

          // 商品規格
          p {
            &:last-child {
              margin-top: 20px;
              color: #999;
            }
          }
        }
      }

      // 單價 , 數量 , 小計區域 , 實付區域
      td {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #f5f5f5;
      }
       
      // 實付區域
      .pay {
        color : $priceColor;
      }
    }
  }

}
</style>