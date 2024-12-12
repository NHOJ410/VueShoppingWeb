<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// 導入 api 
import { submitOrder } from '@/apis/settlement'; // 獲取訂單結算頁的資料
// 導入圖標
import { ShoppingCart, Money } from '@element-plus/icons-vue'
// 導入組件
import DetailMsg from '@/views/Detail/components/DetailMsg.vue' // 導入商品促銷和服務部分組件
import DetailFooter from '@/views/Detail/components/DetailFooter.vue' // 導入底部商品介紹區組件
import ImageView from '@/views/Detail/components/ImageView.vue' // 導入圖片預覽區組件
import SKUItem from '@/views/Detail/components/SkuItem/SKUItem.vue'; // 導入 SKU規格組件
// 導入Pinia倉庫
import { useCartStore } from '@/stores' // 導入 本地購物車倉庫
const cartStore = useCartStore() // 定義購物車倉庫


// 導入 hooks
import { useGetDetailList } from './composables/useGetDetail.js'


// 「獲取商品詳情資料」和「數量統計」部分
const { totalData, detailData, getDetail } = useGetDetailList()



// ---------- sku選擇規格 ----------------------

let skuObj = {} // sku選擇結果 , 加入購物車區域需要用到 所以設定成全局變量

// sku組件選擇結果
const skuResult = (sku) => {
  skuObj = sku
}

// --------- 數字框組件數量處理 -------------------- 
const count = ref(1) // 商品數量 (默認為1)

// --------- 加入購物車按鈕 -------------------- 
const onAddorBuyBtn = async (method) => {

  // 如果用戶沒有選擇完成規格後就去點擊加入購物車按紐
  if (!skuObj.skuId) {
    // 提示用戶請選擇商品規格
    ElMessage.warning({
      message: '請選擇商品規格!',
      duration: 5000
    })

    return 
  }

  // 走到這裡代表是有選擇完成的 , 接下來判斷是「加入購物車」還是「立即購買」

  // 『加入購物車按鈕邏輯』
  if (method === 'addCart') {
    //  調用 cartStore倉庫的方法 , 將需要的商品相關資訊存入進去
    cartStore.addCart(
      {
        id: detailData.value.id, // 商品ID
        name: detailData.value.name, // 商品名稱
        picture: detailData.value.mainPictures[0], // 圖片
        price: detailData.value.price, // 最新價格
        count: count.value, // 商品數量
        skuId: skuObj.skuId, // skuId
        attrsText: skuObj.specsText, // 商品規格文本
        selected: true, // 商品是否選中
      }
    )
  } else { // 如果走到這裡代表是『立即購買』
    
    // 先詢問用戶是否要購買
    await ElMessageBox.confirm(
      `是否確認要購買「${detailData.value.name}」<br>數量為「${count.value}」呢?`,
      '溫馨提示',
      {
        confirmButtonText: '是的 去買單',
        cancelButtonText: '我再想想',
        type: 'warning',
        dangerouslyUseHTMLString: true
        
      }
    )

    // 調用接口 提交訂單給後台
    const res = await submitOrder({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: [{
        skuId: skuObj.skuId,
        count: count.value
      }],
      addressId: '1701111197111160833'
    })

    // 將後台返回的訂單 id 存入進來
    const id = res.result.id

    // 利用查詢參數跳轉傳參的方式來跳轉
    router.replace({
      path: '/pay',
      // 將支付頁面需要的 訂單id傳進去 以便調用接口做渲染
      query: {
        id
      }
    })

  }

  //  提示用戶 『加入購物車 或是 立即購買』 成功
  ElMessage.success({
    message: method === 'addCart' ? '加入購物車完成!' : '購買完成! 請選擇支付方式',
    duration: 5000
  })

  // 讓數字框組件的數量回到 1 
  count.value = 1

}



// --------- 如果點擊了其他商品 , 就跳轉到該商品 ---------------
watch(() => route.path, () => {
  getDetail()
})

</script>

<template>
  <div class="productPage" v-if="detailData.id">
    <!-- 版心設置 -->
    <div class="container">
      <!-- 上方麵包屑導航部分 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${detailData.categories[1].id}` }">{{
            detailData.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${detailData.categories[0].id}` }">{{
            detailData.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ detailData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品訊息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <!-- 左側圖片預覽區 和 數計統計區 -->
            <div class="product">

              <!-- 圖片預覽區部分 -->
              <ImageView :imageList="detailData.mainPictures"></ImageView>

              <!-- 統計數據區域 -->
              <ul class="goods-sales">
                <li v-for="(item, index) in totalData" :key="index">
                  <p>{{ item.title }}</p>
                  <p>{{ item.data }}</p>
                  <p><i :class="`iconfont icon-${item.icon}`"></i>{{ item.value }}</p>
                </li>
              </ul>
            </div>

            <!-- 右側商品訊息 商品數量數字框 規格 和 加入購物車 -->
            <div class="spec">
              <!-- 商品訊息部分 -->
              <DetailMsg :detailData="detailData"></DetailMsg>
              <!-- 規格組件部分 -->
              <SKUItem :goods="detailData" @change="skuResult"></SKUItem>

              <!-- 數字輸入框組件 -->
              <el-input-number class="countItem" v-model="count" :min="1" />
              <!-- 加入購物車按鈕部分 -->
              <div class="footerBtn">
                <div class="addAndBuyBtn">
                  <el-button size="large" :icon="ShoppingCart" type="success" class="addCartbtn"
                    @click="onAddorBuyBtn('addCart')">
                    加入購物車
                  </el-button>
                  <el-button size="large" :icon="Money" type="danger" @click="onAddorBuyBtn('buyNow')">
                    立即購買
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部商品介紹區組件 -->
          <div class="goods-footer">
            <DetailFooter :detailData="detailData"></DetailFooter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang='scss'>
.productPage {

  // 頂部麵包屑組件
  @include bread-item;

  .goods-info {
    display: flex;
    min-height: 600px;
    background: #fff;

    // 左側圖片預覽區域
    .product {
      width: 580px;
      height: 600px;
      padding: 10px 50px;
    }

    // 右側商品詳情區域
    .spec {
      // background-color: red;
      flex: 1;
      padding: 30px 30px 30px 30px;
      position: relative;


      // 數字框組件
      .countItem {
        position: absolute;
        top: 80%;
      }

      // 加入購物車 和 立即購買按鈕
      .footerBtn {
        width: 100%;
        position: absolute;
        bottom: 20px;
        left: 0;
        
        .addAndBuyBtn {
        width: 100%;
        display: flex;
        justify-content: space-around;
        

        .el-button {
          margin-top: 80px;
          width: 45%;
          height: 15%;
          font-size: 2rem;
        }

      }

      }
      


    }


  }

  // 「銷量人氣 , 商品評價 , 收藏人氣 」統計區域
  .goods-sales {
    display: flex;
    align-items: center;
    text-align: center;
    width: 400px;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        content: "";
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }



  // 底部商品展示部分
  .goods-footer {
    display: flex;
    margin-top: 20px;
  }

}
</style>