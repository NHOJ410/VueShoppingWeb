// 全局組件的註冊 通過插件的形式

// 導入需要全局註冊的組件
import ImageView from "@/components/ImageView.vue"; // 圖片列表+放大鏡組件
import SkuItem from '@/components/SkuItem/index.vue' // 商品規格組件
import SVGItem from "./SVGItem.vue"; // SVG圖標組件


// 進行全局註冊

export const globalComponents = {
  // install (app) 來進行插件開發
  install (app) {
    // 組件全局註冊 app.conponent('組件名字',組件配置對象)
    app.component("ImageView", ImageView);
    app.component("SkuItem", SkuItem);
    app.component("SVGItem", SVGItem);
  }
}