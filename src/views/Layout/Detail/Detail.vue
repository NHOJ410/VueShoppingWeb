<script setup>
import { ref , watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';
// 導入圖標
import { ShoppingCart } from '@element-plus/icons-vue'
// 導入api 
import { getDetailData } from '@/apis/detail'; // 獲取商品詳情資料
// 導入組件
import DetailMsg from '@/views/Layout/Detail/components/DetailMsg.vue' // 導入商品促銷和服務部分組件
import DetailFooter from '@/views/Layout/Detail/components/DetailFooter.vue' // 導入商品詳情底部組件
// 導入Pinia倉庫
import { useCartStore } from '@/stores' // 導入 本地購物車倉庫
const cartStore = useCartStore()

// ----------- 數量統計部分 ---------------
const totalData = ref([
  { title: '銷量人氣', value: '銷量人氣', icon: 'task-filling', data: 0 },
  { title: '商品評價', value: '查看評價', icon: 'comment-filling', data: 0 },
  { title: '收藏人氣', value: '收藏商品', icon: 'favorite-filling', data: 0 },
])

// ------------ 獲取商品詳情資料 ---------------

const route = useRoute()
const detailData = ref({}) // 存儲商品詳情數據
// 發送請求 獲取商品詳情數據
const getDetail = async () => {
  const res = await getDetailData(route.params.id)
  detailData.value = res.result


  // -------- 存儲商品評價部分 ----------- 

  // 提取 collectCount、commentCount 和 salesCount
  const { collectCount, commentCount, salesCount } = res.result;

  // 將數據添加到 totalData的 data裡面 
  totalData.value[0].data = salesCount
  totalData.value[1].data = commentCount
  totalData.value[2].data = collectCount

}
getDetail()

// ---------- sku選擇規格 ----------------------

let skuObj = {} // sku選擇結果 , 加入購物車區域需要用到 所以設定成全局變量

// sku組件選擇結果
const skuResult = (sku) => {
  skuObj = sku
}

// --------- 數字框組件數量處理 -------------------- 
const count = ref(1) // 商品數量 (默認為1)



// --------- 加入購物車按鈕 -------------------- 

const onAddCart = () => {

  if (skuObj.skuId) { //  如果用戶選擇完規格後點擊加入購物車按紐

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
    //  提示用戶加入購物車成功
    ElMessage.success({
      message : '添加購物車完成!',
      duration : 5000
    })

    // 讓數字框組件的數量回到 1 
    count.value = 1

  } else { // 如果用戶沒有選擇完成規格後就去點擊加入購物車按紐
    // 提示用戶請選擇商品規格
    ElMessage.warning({
      message : '請選擇商品規格!',
      duration : 5000
    })
  }
}



// --------- 如果點擊了其他商品 , 就跳轉到該商品 ---------------
watch(() => route.path , () => {
  getDetail()
})

</script>

<template>
  <div class="xtx-goods-page" v-if="detailData.id">
    <!-- 版心設置 -->
    <div class="container" >
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
            <div class="media">
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

            <div class="spec">
              <!-- 商品訊息部分 -->
              <DetailMsg :detailData="detailData"></DetailMsg>
              <!-- 規格組件部分 -->
              <SkuItem :goods="detailData" @change="skuResult"></SkuItem>

              <!-- 數字輸入框組件 -->
              <el-input-number v-model="count" :min="1" />
              <!-- 加入購物車按鈕部分 -->
              <div>
                <el-button size="large" :icon="ShoppingCart" type="success" class="addCartbtn" @click="onAddCart">
                  加入購物車
                </el-button>
              </div>
            </div>
          </div>

          <!-- 底部商品展示部分 -->
          <div class="goods-footer">
            <DetailFooter :detailData="detailData"></DetailFooter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;
    
    // 左側圖片預覽區域
    .media {
      width: 580px;
      height: 600px;
      padding: 10px 50px;
    }
    
    // 右側商品詳情區域
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  // 數據統計區域
  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
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

  // 麵包屑組件
  .bread-container {
    padding: 25px 0;
  }
 
  // 加入購物車按鈕
  .addCartbtn {
    margin-top: 15px;

  }
  
  // 底部商品展示部分
  .goods-footer {
    display: flex;
    margin-top: 20px;
  }

}
</style>