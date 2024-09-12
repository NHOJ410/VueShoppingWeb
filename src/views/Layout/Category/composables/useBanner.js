import { ref , onMounted } from 'vue'
// 導入api
import { getBannerService } from "@/apis/home"; // 導入輪播圖數據


 export const useBanner = () => {

  // 獲取輪播圖業務邏輯
  const bannerList = ref([]);
  const getBanner = async () => {
    const result = await getBannerService(2);
    bannerList.value = result.result;
  };

  // 由於需要操作 DOM 所以在 onMounted() 鉤子中調用接口 獲取數據
  onMounted(() => {
    getBanner(); // 獲取輪播圖數據
  });
  
  // 將需要用到的數據 return 出去

  return {
    bannerList
  }

  
}