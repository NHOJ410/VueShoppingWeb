import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    cartList.value = cartList.value.filter( item => item.skuId !== skuId)
  }





  return {
    cartList,
    addCart,
    deleteCart
  }
},
// 持久化
{
  persist: true
})

