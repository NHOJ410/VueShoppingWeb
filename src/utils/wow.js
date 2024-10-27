import WOW from 'wow.js'; // 導入 wow.js

const initWowJS = () => {
  const wow = new WOW({
    boxClass: 'wow', // 動畫元素的 CSS 類名（默認為 wow）
    animateClass: 'animated', // 動畫 CSS 類名（默認為 animated）
    offset: 0, // 觸發動畫時與元素的距離（默認為 0）
    mobile: true, // 在移動設備上觸發動畫（默認為 true）
    live: true, // 對異步加載的內容生效（默認為 true）
  });

  wow.init(); // 初始化 WOW.js
};

export default initWowJS;