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

<script>
import { watchEffect } from 'vue'
import getPowerSet from './power-set'
const spliter = '★'
// 根據 skus 資料得到路徑字典物件
const getPathMap = (skus) => {
  const pathMap = {}
  if (skus && skus.length > 0) {
    skus.forEach(sku => {
      //  過濾出有庫存有效的 sku
      if (sku.inventory) {
        //  得到 sku 屬性值數組
        const specs = sku.specs.map(spec => spec.valueName)
        //  得到 sku 屬性值數組的子集
        const powerSet = getPowerSet(specs)
        //  設定給路徑字典物件
        powerSet.forEach(set => {
          const key = set.join(spliter)
          // 如果沒有就先初始化一個空數組
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          pathMap[key].push(sku.id)
        })
      }
    })
  }
  return pathMap
}

// 初始化禁用狀態
function initDisabledStatus (specs, pathMap) {
  if (specs && specs.length > 0) {
    specs.forEach(spec => {
      spec.values.forEach(val => {
        // 設置禁用狀態
        val.disabled = !pathMap[val.name]
      })
    })
  }
}

// 得到當前選中規格的集合
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find(val => val.selected)
    if (selectedVal) {
      selectedArr[index] = selectedVal.name
    } else {
      selectedArr[index] = undefined
    }
  })
  return selectedArr
}

// 更新按鈕的禁用狀態
const updateDisabledStatus = (specs, pathMap) => {
  // 遍歷每一種規格
  specs.forEach((item, i) => {
    // 拿到當前選擇的項目
    const selectedArr = getSelectedArr(specs)
    // 遍歷每一個按鈕
    item.values.forEach(val => {
      if (!val.selected) {
        selectedArr[i] = val.name
        // 去掉 undefined 之後組合成 key
        const key = selectedArr.filter(value => value).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}


export default {
  name: 'XtxGoodSku',
  props: {
    // specs:所有的規格資訊  skus:所有的 SKU 組合
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    let pathMap = {}
    watchEffect(() => {
      // 得到所有字典集合
      pathMap = getPathMap(props.goods.skus)
      // 组件初始化的时候更新禁用狀態
      initDisabledStatus(props.goods.specs, pathMap)
    })

    const clickSpecs = (item, val) => {
      if (val.disabled) return false
      // 選中與取消選中邏輯
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(bv => { bv.selected = false })
        val.selected = true
      }
      // 點擊之後再次更新選中狀態
      updateDisabledStatus(props.goods.specs, pathMap)
      // 把選擇的 sku 信息傳出去給父組件
      // 觸發 change 事件將 sku 資料傳遞出去
      const selectedArr = getSelectedArr(props.goods.specs).filter(value => value)
      // 如果選中的規格數量和傳入的規格總數相等則傳出完整資訊（都選擇了）
      // 否則傳出空對象
      if (selectedArr.length === props.goods.specs.length) {
        // 從路徑字典中得到 skuId
        const skuId = pathMap[selectedArr.join(spliter)][0]
        const sku = props.goods.skus.find(sku => sku.id === skuId)
         // 傳遞資料給父組件
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
        })
      } else {
        emit('change', {})
      }
    }
    return { clickSpecs }
  }
}
</script>


<style scoped lang="scss">
// 通用樣式變量
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

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
      height: 60px;
  
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