import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 導入api 
import { getDetailData } from '@/apis/detail'; // 獲取商品詳情資料

// 「獲取商品詳情資料」和「數量統計」部分
export const useGetDetailList = () => {
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

  onMounted(() => {
    getDetail()
  })

  return {
    totalData, // 數量統計數據
    detailData,// 商品詳情數據
    getDetail  // 獲取商品詳情數據
  }
}