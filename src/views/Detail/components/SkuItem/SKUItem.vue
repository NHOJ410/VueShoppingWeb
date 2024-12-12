<template>
  <!-- 商品規格組件部分 -->
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <!-- 規格屬性名 -->
      <dt>{{ item.name }}</dt>
      <!-- 規格屬性值 -->
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 規格圖片 -->
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)"
            v-if="val.picture" :src="val.picture" />
          <!-- 規格文字 -->
          <span :class="{ selected: val.selected, disabled: val.disabled}" @click="clickSpecs(item, val)" v-else>{{
              val.name
          }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import getPowerSet from './power-set'

// 接收父組件傳遞過來的數據
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] })
  }
})

// 定義 子傳父的 emit事件
const emit = defineEmits(['change'])

// 統一分隔符
const spliter = '-'

// 用來存儲有庫存的規格路徑集合 方便獲取
const pathMap = ref({}) 



// 1. 規格選取邏輯
const clickSpecs = (item, val) => {

// 1.1 如果當前是禁用狀態 , 點擊後不做任何動作
if (val.disabled) return false

// 1.2 如果當前已經選中 , 取消選中
if (val.selected) {
  val.selected = false
  
} else {
  // 1.3 走到這裡代表是未選中狀態 , 則按照「排他思想」先將全部的選中狀態取消
  item.values.forEach(bv => { bv.selected = false })
  // 1.4 再單獨把那一項設為選中
  val.selected = true
}

// 5.9 調用第五點封裝的函數 , 實時更新商品規格的禁用狀態
updateDisabledStatus(props.goods.specs, pathMap.value)

// 4.6 調用第四點封裝的函數 , 得到用戶已選擇的規格 並將格式整理好
const selectedArr = getSelectedArr(props.goods.specs).filter(value => value)
  

// 6. 最後的最後 , 如果『用戶已選擇的規格的數據數量 等於 規格總數』 , 代表用戶已經選擇完畢
  if (selectedArr.length === props.goods.specs.length) {
    // 6.1 利用 pathMap 來獲取到該選擇商品的 skuId
    const skuId = pathMap.value[selectedArr.join(spliter)][0]
    // 6.2 利用 skuId 來查找對應的哪一項商品
    const sku = props.goods.skus.find(sku => sku.id === skuId)
    // 6.3 子傳父的 emit事件 傳遞回去給父組件 , 並將需求格式寫好
    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
    })
  } else {
    // 走到這裡代表「用戶尚未選擇完畢」則回傳一個空對象
    emit('change', {})
  }
}



// 2. 根據 skus規格資料 得到『有庫存 , 且可能的』規格路徑集合
const getPathMap = (skus) => {
  // 2.1 創建一個空對象 , 用來存儲最終的結果
  let pathMap = {}

  // 2.2 如果有規格 , 且規格長度大於 0 
  if (skus && skus.length > 0) {
    
    // 2.3 遍歷所有的規格 
    skus.forEach(sku => {
      // 2.4 如果有庫存的話
      if (sku.inventory) {
        // 2.5 取出當前 sku 的規格
        const specs = sku.specs.map(spec => spec.valueName)
        // 2.6 並使用 『冪集算法』 , 把所有可能的規格組合集中起來
        const powerSet = getPowerSet(specs)
        // 2.7 遍歷剛剛得到的『所有可能的規格組合』
        powerSet.forEach(set => {
          // 2.8 利用 join方法 , 來整理 key 鍵值
          const key = set.join(spliter)
          // 2.9 如果對應的 key 不存在 , 則創建一個空數組
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          // 2.10 走到這裡代表 key 存在 , 則把當前 sku 的 id push 到對應的數組中
          pathMap[key].push(sku.id)
        })
      }
    })
  }

  // 2.11 最後將 pathMap結果 return 出去 , 裡面存的就是 『有庫存 , 並且可能的』規格路徑集合
  return pathMap
}


// 3. 初始化「規格按鈕的禁用狀態」( 和我們上面得到的結果來進行判斷 )
// specs : 後端返回過來的所有數據 , pathMap : 我們上面得到的 『有庫存 , 並且可能的』規格路徑集合
const initDisabledStatus = (specs, pathMap) => {
  // 3.1 如果有規格 , 且規格長度大於 0 
  if (specs && specs.length > 0) {
    // 3.2 這裡受到數據結構的影響 先遍歷外層數據 
    specs.forEach(spec => {
      // 3.3 再來遍歷裡層數據
      spec.values.forEach(val => {
        // 3.4 如果 path[val.name] 存在 , 代表有數據
        if (pathMap[val.name]) {
          // 3.5 那就不禁用按鈕 設置為 false
          val.disabled = false
        } else {
          // 3.6 走到這裡代表 path[val.name] 不存在 , 代表沒有數據
          // 3.7 那就禁用按鈕 設置為 true
          val.disabled = true
        }
      })
    })
  }
}



// 4. 獲取「用戶當前已選擇的規格」
const getSelectedArr = (specs) => {

  // 4.1 先定義一個空數組 用來儲存用戶已選擇的規格
  const selectedArr = []

  // 4.2 遍歷傳遞過來的 specs 
  specs.forEach(spec => {
    /* 4.3 目標 : 找到 spec.values 中 裡面 selected 為 true 的選項 
    然後把 name 字段『按照要求的順序』 添加數組對應的位置 
    這裡利用 find() 方法 來查找*/
    const selectedVal = spec.values.find(item => item.selected)
    /* 4.4 這樣 selectedVal 裡面就是存儲『用戶已選擇的規格』, 接下來用三元來判斷
    如果有 selectedVal 的話 就把它的 name push 到 selectedArr : 否則 push 一個 undefined */
    selectedArr.push( selectedVal ? selectedVal.name : undefined )
    
  })

  // 4.5 最後將 selectedArr 結果 return 出去
  return selectedArr
  
}



// 5. 用戶切換規格時 , 「更新禁用狀態」
const updateDisabledStatus = (specs, pathMap) => {

  // 5.1 遍歷傳遞過來的 specs
  specs.forEach((item , index) => {
    // 5.2 調用上面第四點封裝好的方法 , 獲取『用戶當前選擇的規格』
    const selectedValues = getSelectedArr(specs)
    // 5.3 獲取到『用戶當前選擇的規格後』將 name 字段 , 填充到相對應的位置中
    selectedValues[index] = item.name 
    /* 5.4 和 第二點的 2-8 一樣 , 利用 join方法 , 來整理 key 鍵值
    『這裡注意要和 2-8 一樣用 - 分隔 不然找不到』 */
    const key = selectedValues.filter(value => value).join(spliter)
    // 5.5 如果 pathMap[key] 存在 , 代表有數據
    if (pathMap[key]) {
      // 5.6 那就不禁用按鈕 設置為 false
      item.disabled = false
    } else {
      // 5.7 走到這裡代表 pathMap[key] 不存在 , 代表沒有數據
      // 5.8 那就禁用按鈕 設置為 true
      item.disabled = true
    }
    
  })
  
}




// 使用 watchEffect 來監聽數據的變化 隨時更新 按鈕狀態
watchEffect(() => {
  // 根據 skus規格資料 得到『有庫存 , 且可能的』規格路徑集合
  pathMap.value = getPathMap(props.goods.skus)
  // 初始化「規格按鈕的禁用狀態」
  initDisabledStatus(props.goods.specs, pathMap.value)
})

</script>


<style scoped lang="scss">
// 通用樣式變量
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  
  // 商品規格選取狀態
  &.selected {
    border-color: $xtxColor;
  }
  
  // 禁用狀態
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}


// 商品規格組件
.goods-sku {
    padding-top: 20px; 
  
  dl {
    display: flex;
    align-items: flex-start;   
    
    // 規格屬性名
    dt {
      width: 60px;
      color: #999;
      font-size: 16px;
    } 
    
    // 規格屬性值
    dd {
      flex: 1;
      color: #666;
      
      
      // 規格圖片
      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
       
      // 規格文字
      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
      
    }
  }
}
</style>