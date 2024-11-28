<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 導入api
import { getUserOrderAPI } from '@/apis/userCenter'; // 獲取訂單詳情資料
// 導入 el-icon組件
import { Money, Close, Check, Warning } from '@element-plus/icons-vue'


// tab列表
const tabTypes = ref([
  { name: "all", label: "全部訂單" },
  { name: "unpay", label: "待付款" },
  { name: "deliver", label: "待發貨" },
  { name: "receive", label: "待收貨" },
  { name: "comment", label: "待評價" },
  { name: "complete", label: "已完成" },
  { name: "cancel", label: "已取消" }
])


// -------------- 獲取我的訂單列表部分 -------------------

const orderList = ref([]) // 存儲我的訂單的數據
const totalCount = ref(0) // 存儲訂單總數量 用來做分頁器的渲染

// 獲取我的訂單列表所需要的參數
const userOrderParams = ref({
  orderState: 0, // tab切換的狀態
  page: 1, // 當前頁數
  pageSize: 5 // 單頁多少條數據
})

// 定義方法 發送請求 獲取數據
const getUserOrder = async () => {


  const res = await getUserOrderAPI(userOrderParams.value)

  // 將獲取到的數據存起來
  orderList.value = res.result.items

  // 存儲訂單總數量
  totalCount.value = res.result.counts

}

onMounted(() => {
  getUserOrder()
})

// 按照接口文檔 , 根據後端回傳的 payState 決定要顯示哪個支付狀態 
const formatPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待發貨',
    3: '待收貨',
    4: '待評價',
    5: '已完成',
    6: '已取消'
  }

  return stateMap[payState]
}


// -------------------- 根據切換tab欄 , 來展示對應的訂單數據 ------------------

// 監聽 el-tabs 的切換狀態
const tabChange = (item) => {

  // 將獲取到的新值 , 賦值給 userOrderParams.value.orderState 來發送請求 獲取對應的訂單數據
  userOrderParams.value.orderState = item

  // 重新發送一次請求 渲染對應的訂單數據即可!
  getUserOrder()

}


// 跳轉到商品詳情頁面的事件處理函數
const router = useRouter()

const jumptoDetail = (item) => {

  router.push(`/detail/${item.skus[0].spuId}`)
}

// ---------------------- 按鈕部分 ----------------------

// 立即購買按鈕 ( 由於接口沒有skuId = = 這裡直接跳轉到支付頁面即可 )
const buyNow = async (item) => {

  await ElMessageBox.confirm(
    '確定要購買這些商品嗎?',
    '溫馨提示',
    {
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )

  const id = item.id
  // 利用查詢參數跳轉傳參的方式來跳轉
  router.replace({
    path: '/pay',

    // 將支付頁面需要的 訂單id傳進去 以便調用接口做渲染
    query: {
      id
    }
  })
}





</script>

<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange" :type="'border-card'" :stretch="true">
      <!-- tab切換 -->
      <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

      <div class="main-container">

        <!-- 如果沒有訂單所展示的頁面 -->
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暫無訂單數據" />
        </div>


        <!-- 訂單列表部分 -->
        <div v-else>
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <!-- 訂單列表 - 頭部下單時間 / 訂單編號 部分 -->
            <div class="head">
              <span>下單時間：{{ order.createTime }}</span>
              <span>訂單編號：{{ order.id }}</span>
            </div>

            <!-- 訂單列表 - 商品表格 -->
            <div class="body">

              <!-- 訂單列表 - 商品詳情部分 -->
              <div class="column product" @click="jumptoDetail(order)">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <!-- 商品列表 - 商品圖片 -->
                    <a class="image" href="#">
                      <img :src="item.image" alt="" />
                    </a>

                    <!-- 商品列表 - 商品訊息 -->
                    <div class="info">
                      <!-- 商品名 -->
                      <p class="name ellipsis-2">{{ item.name }}</p>
                      <!-- 商品規格 -->
                      <p class="attr ellipsis">{{ item.attrsText }}</p>
                    </div>

                    <!-- 商品價格 -->
                    <p class=" price" style="width : 100px">$ {{ item.realPay?.toFixed(0) }} 元</p>

                    <!-- 商品數量 -->

                    <p class="count">x {{ item.quantity }} 件</p>
                  </li>
                </ul>
              </div>

              <!-- 訂單列表 - 付款狀態部分 -->
              <div class="column state">
                <p>{{ formatPayState(order.orderState) }}</p>
              </div>

              <!-- 訂單列表 - 付款詳情部分 -->
              <div class="column amount">
                <p class="price">$ {{ order.payMoney?.toFixed(0) }}</p>
                <p class="price"> 含運費：$ {{ order.postFee?.toFixed(0) }} 元 </p>
                <p>在線支付</p>
              </div>


              <!-- 訂單列表 - 付款結果部分 -->
              <div class="column action">

                <!-- 付款結果 - 尚未付款 -->
                <div class="orderState" v-if="order.orderState === 1">
                  <!-- 立即付款按鈕 -->
                  <el-button type="danger" @click="buyNow(order)" :icon="Money" :size="'large'">立即付款</el-button>
                  <!-- 取消訂單按鈕 -->

                  <el-tooltip class="box-item" effect="dark" content="沒有api😢" placement="top-start">
                    <el-button type="warning" :icon="Close" :size="'large'">取消訂單</el-button>
                  </el-tooltip>
                </div>


                <!-- 付款結果 - 已付款 未收貨 (3) -->
                <div class="orderState" v-if="order.orderState === 3">
                  <el-tooltip class="box-item" effect="dark" content="沒有api😢" placement="top-start">
                    <el-button type="primary" :icon="Check" :size="'large'">確認收貨</el-button>
                  </el-tooltip>
                </div>

                <!-- 付款結果 - 已付款 已收貨 已完成 (2,3,4,5) -->
                <div class="orderState" v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <el-tooltip class="box-item" effect="dark" content="沒有api😢" placement="top-start">
                    <el-button type="danger" :icon="Money" :size="'large'">再次購買</el-button>
                  </el-tooltip>
                </div>

                <!-- 付款結果 - 申請售後 (4,5) -->
                <div class="orderState" v-if="[4, 5].includes(order.orderState)">
                  <el-tooltip class="box-item" effect="dark" content="沒有api😢" placement="top-start">
                    <el-button type="info" :icon="Warning" :size="'large'">申請售後服務</el-button>
                  </el-tooltip>
                </div>

              </div>
            </div>
          </div>
          <!-- 底部分頁器部分 -->
          <div class="pagination-container">
            <el-pagination v-model:current-page="userOrderParams.page" v-model:page-size="userOrderParams.pageSize"
              :total="totalCount" background layout="prev, pager, next , sizes , total" :page-sizes="[5, 10, 15, 20]"
              @size-change="getUserOrder" @current-change="getUserOrder" />
          </div>
        </div>
      </div>

    </el-tabs>
  </div>
</template>


<style scoped lang="scss">
.order-container {
  padding: 10px 20px;


  // 商品價格 (紅色)
  .price {
    color: $priceColor;
  }


  // 訂單頁面
  .main-container {
    min-height: 500px;

    // 如果沒有訂單所展示的頁面
    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }



}

// 訂單列表部分 
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  // 訂單列表 -頭部
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    display: flex;
    justify-content: space-evenly;
    font-size: 16px;

  }


  // 訂單列表 - 表格部分
  .body {
    display: flex;
    align-items: stretch;



    // 訂單列表 商品詳情部分
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      &.product {
        flex: 1;
        padding: 0;
        align-self: center;
        height: 90px;
        overflow-y: scroll;
        cursor: pointer;



        // 訂單列表 商品詳情部分
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;


            &:last-child {
              border-bottom: none;
            }

            // 商品列表 - 商品圖片
            .image {
              width: 70px;
              height: 70px;
            }

            // 商品列表 - 商品訊息
            .info {
              width: 220px;
              height: 70px;
              text-align: left;
              line-height: 1;
              padding: 0 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;


              // 商品規格部分
              .attr {
                color: #999;
                font-size: 14px;
              }


            }



            // 商品列表 - 商品數量
            .count {
              width: 80px;

            }
          }
        }
      }

      // 付款狀態部分
      &.state {
        width: 120px;
        height: 100%;
        margin-top: 20px;
        font-size: 18px;
        font-style: normal;
      }

      // 付款詳情部分
      &.amount {
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
        font-size: 16px;
      }

      // 訂單列表 - 付款結果按鈕部分
      &.action {

        .orderState {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;

        }


      }
    }
  }
}
</style>