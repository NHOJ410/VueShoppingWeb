<script setup>
import { ref , onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 導入api
import { getSettlementData , submitOrder } from '@/apis/settlement'; // 獲取訂單結算頁的資料
// 導入倉庫
import { useCartStore } from '@/stores' // 導入 購物車倉庫
// 定義倉庫
const cartStore = useCartStore() // 定義 購物車倉庫
// 定義路由
const router = useRouter()


// ---------- 獲取訂單結算頁的資料 -----------

const orderData = ref({})  // 訂單資料
const defaultAddress = ref({})  // 默認地址資料 ( 呈現在頁面中的 )
const addressList = ref([]) // 收貨地址列表

// 調用接口 獲取數據

const getSettlement = async () => {
  
  const res = await getSettlementData()
  
  orderData.value = res.result // 訂單資料

  defaultAddress.value = res.result.userAddresses.find( item => item.isDefault === 0 ) // 找到後端提供的默認地址資料來渲染頁面

  addressList.value = res.result.userAddresses // 收貨地址列表
  
}
// 調用請求 獲取數據 ( 因為涉及到 DOM操作 所以在 onMounted裡面調用 )
onMounted(() => {
  getSettlement()
})

// ---------- 切換收貨地址部分 -----------

const toggleFlag = ref(false) // 控制切換地址的顯示隱藏變量

const activeAddress = ref({}) // 用戶切換的的收貨地址

// 切換收貨地址事件處理函數
const switchAddress = ( item ) => {
  
  activeAddress.value = item // 存儲用戶切換的的收貨地址


}

// 確認切換收貨地址事件處理函數
const onChangeAddress = () => {
  // 將我們切換的收貨地址存儲到默認地址中
  defaultAddress.value = activeAddress.value
  // 關閉彈窗
  toggleFlag.value = false
}

// 提交訂單按鈕 
const onSubmitOrder = async () => {
  
  // 調用接口 提交訂單給後台
  const res = await submitOrder({
    deliveryTimeType : 1,
    payType : 1,
    payChannel : 1,
    buyerMessage : '',
    goods : orderData.value.goods.map( item => {
      return {
        skuId : item.skuId,
        count : item.count
      }
    }),
    addressId : defaultAddress.value.id
  })

  // 將後台返回的訂單 id 存入進來
  const id = res.result.id

  // 利用查詢參數跳轉傳參的方式來跳轉
  router.push({
    path:'/pay',
    // 將支付頁面需要的 訂單id傳進去 以便調用接口做渲染
    query:{
      id
    }
  })
  
  // 跳轉到支付頁面後 , 要更新購物車的最新數據 調用之前在 cartStore封裝的方法
  cartStore.getLoginUserList()
  
}

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收貨地址區域-->
        <h3 class="box-title">收貨地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <!-- 如果用戶沒有收貨地址的話 所顯示的區域 -->
              <div class="none" v-if="!defaultAddress">您需要先添加收貨地址才可提交訂單。</div>
              <!-- 如果用戶有收貨地址的話 所顯示的區域 -->
              <ul v-else>
                <li><span>收貨人：</span>{{ defaultAddress.receiver }}</li>
                <li><span>聯繫方式：</span>{{ defaultAddress.contact }}</li>
                <li><span>收貨地址：</span>{{ defaultAddress.fullLocation }} {{ defaultAddress.address }}</li>
              </ul>
            </div>
            <!-- 添加地址/切換地址按鈕 -->
            <div class="action">
              <el-button size="large" @click="toggleFlag = true">切換地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品列表訊息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">單價</th>
                <th width="170">數量</th>
                <th width="170">小計</th>
                <th width="170">實付</th>
              </tr>
            </thead>
            <!-- 每一項商品資料 -->
            <tbody>
              <tr v-for="item in orderData.goods" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="">
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <!-- 單價 -->
                <td> $ {{ item.price }} 元</td>
                <!-- 數量 -->
                <td>{{ item.count }} 件</td>
                <!-- 小計區域 -->
                <td> $ {{ item.totalPrice }} 元</td>
                <!-- 實付區域 -->
                <td> $ {{ item.totalPayPrice }} 元</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送時間部分 -->
        <h3 class="box-title">配送時間</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送貨時間：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送貨：周一至周五</a>
          <a class="my-btn" href="javascript:;">雙休日、假日送貨：周六至周日</a>
        </div>
        <!-- 支付方式部分 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在線支付</a>
          <a class="my-btn" href="javascript:;">貨到付款</a>
          <span style="color:#999">貨到付款需付5元手續費</span>
        </div>
        <!-- 金額明細部分 -->
        <h3 class="box-title">金額明細</h3>
        <div class="box-body">
          <!-- 底部統計區域 -->
          <div class="total">
            <dl>
              <dt>商品件數：</dt>
              <dd>{{ orderData.summary?.goodsCount }} 件</dd>
            </dl>
            <dl>
              <dt>商品總價：</dt>
              <dd>${{ orderData.summary?.totalPrice.toFixed(2) }} 元</dd>
            </dl>
            <dl>
              <dt>運<i></i>費：</dt>
              <dd>${{ orderData.summary?.postFee.toFixed(2) }} 元</dd>
            </dl>
            <dl>
              <dt>應付總額：</dt>
              <dd class="price">{{ orderData.summary?.totalPayPrice.toFixed(2) }} 元</dd>
            </dl>
          </div>
        </div>
        <!-- 提交訂單 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="onSubmitOrder">提交訂單</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切換收貨地址區域 -->
    <el-dialog title="切換收貨地址" width="30%" center v-model="toggleFlag">
    <div class="addressWrapper">
      <div class="text item" :class="{ active : activeAddress.id === item.id }" v-for="item in addressList" :key="item.id" @click="switchAddress(item)">
        <ul>
          <li><span>收貨人：</span>{{ item.receiver }}</li>
          <li><span>聯絡方式：</span>{{ item.contact }}</li>
          <li><span>收貨地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onChangeAddress">確認更換</el-button>
        <el-button @click="toggleFlag = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加地址 -->

</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;
    .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

// 收貨地址區域
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

// 商品列表區域
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>