import { defineStore } from 'pinia'
import { ref , computed} from 'vue'


// 購物車模塊

export const useCartStore = defineStore('cart', () => {

  // --------- 購物車列表 ---------
  const cartList = ref([])


  // --------- 添加購物車 --------- 
  const addCart = (commodity) => {

    // 已添加過購物車 --> count + 1 
    // 未添加過購物車 --> 直接push

    // 使用數組 find() 方法 , 來查找返回項目有沒有 skuId 這項數據
    const item = cartList.value.find(item => item.skuId === commodity.skuId)

    //  這裡的 item 就是有找到 skuId 的那項規格的商品 那麼就可以做判斷了 

    if (!item) { //  如果原本就沒有這項規格商品的話

      //  就用 push 將得到的商品數據加入到購物車列表中就可以了
      cartList.value.push(commodity)

    } else { // 走到 else 代表是 原本就有這項規格的商品

      //  就將我們得到的商品數量加上去 這樣就完成了!
      item.count += commodity.count

    }

  }


  // --------- 刪除購物車 ---------
  const deleteCart = (skuId) => {
    // 使用數組 filter() 方法 , 將購物車頁面點擊刪除的商品過濾掉 , 並重新賦值給 購物車列表 這樣就完成了刪除功能
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }


  // --------- 計算總數量 ----------

  const totalCount = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.count, 0)
  })

  // --------- 計算總價格 ----------

  const totalPrice = computed(() => {

    return cartList.value.reduce((sum, item) => sum + (item.price * item.count), 0)
  })

  
  // --------- 修改選取框中的狀態 ----------

  const isSelected = ( skuId , checked ) => {
    
    // 使用 find來查找我們在購物車頁面 點選的那一項商品
    const selected = cartList.value.find(item => item.skuId === skuId)

    // 修改他的選取狀態 === 我們回傳過來的 checked狀態就可以了
    selected.selected = checked

  }

  
  // --------- 全選框部分 ----------
  

  // 當複選框全部勾上後 , 全選框自動打勾 
  const isAllChecked = computed(() => {

    // 使用 數組every來判斷是否所有的 小選框都選中了 返回一個布林值
    return cartList.value.every(item => item.selected === true )
  })

  
  // 全選框來控制小選框的選取狀態 

  const checkAll = (checked) => {
    
    cartList.value.forEach(item => item.selected = checked)

  }


  // --------- 已選擇商品數量的總和 ------------
  const selectCount = computed(() => {
    
    // 先用 filter() 將 選中的商品篩選出來
    const isSelect = cartList.value.filter(item => item.selected === true)
    
    // 然後再利用 reduce() 方法 來對選中的商品裡面的數量來進行累加和 這樣就ok了
    return isSelect.reduce((sum, item) => sum + item.count, 0)
  })

  
  // --------- 已選擇商品數量的總價格 ------------

  const selectPrice = computed(() => {
    
    // 先用 filter() 將 選中的商品篩選出來
    const isSelect = cartList.value.filter(item => item.selected === true)

    // 然後再利用 reduce() 方法 來對選中的商品裡面的價格來進行累加和 這樣就ok了
    return isSelect.reduce( (sum , item ) => sum + ( item.count * item.price ) , 0)
  })



  return {
    cartList,
    addCart,
    deleteCart,
    totalCount,
    totalPrice,
    isSelected,
    isAllChecked,
    checkAll,
    selectCount,
    selectPrice
  }
},
  // 持久化
  {
    persist: true
  })

