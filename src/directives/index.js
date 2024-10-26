import { useIntersectionObserver } from '@vueuse/core' // 判斷元素是否在可視區域插件


// 圖片懶加載指令
export const lazyImg = {
  install(app) {
    app.directive('lazyLoading', {
      beforeMount(el, binding) {
        // 這裡的 el 就是要懶加載的元素
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // inTersecting 代表元素是否在可視區域 返回一個 boolean
          //  拿到是否進入 viewport 的 boolean後 , 就可以來做圖片懶加載的判斷了 
          if (isIntersecting) { // 如果值為 true ( 代表進入圖片視口區域的話 )
            el.src = ''
            // 就讓圖片載入
            el.src = binding.value
            stop() // 取消監聽是否進入圖片視口區域的判斷
          }    
         },
        )
      }
    })
  }
}