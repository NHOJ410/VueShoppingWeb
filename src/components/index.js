// 全局組件的註冊 通過插件的形式

// 導入需要全局註冊的組件
import SVGItem from "./SVGItem.vue"; // SVG圖標組件


// 進行全局註冊

export const globalComponents = {
  // 組件全局註冊 app.conponent('組件名字',組件配置對象)
  install (app) {
    app.component("SVGItem", SVGItem);
  }
}