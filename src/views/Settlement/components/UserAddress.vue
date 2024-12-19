<script setup>
import { storeToRefs } from 'pinia';
import { Refresh  } from '@element-plus/icons-vue'

// 導入 Pinia倉庫
import { usePayOrderStore } from '@/stores';
// 定義 倉庫
const payOrderStore = usePayOrderStore() // 定義訂單倉庫

// 使用 storeToRefs宏將 訂單倉庫的數據 解構出來
const { defaultAddress, addressList, toggleFlag, activeAddress } = storeToRefs(payOrderStore)


</script>

<template>
  <!-- 收貨地址區域-->
  <div class="address">
    <div class="addressData">

      <!-- 如果用戶沒有收貨地址的話 所顯示的區域 -->
      <div class="none" v-if="!defaultAddress">您需要先添加收貨地址才可提交訂單。</div>

      <!-- 如果用戶有收貨地址的話 所顯示的區域 -->
      <ul v-else>
        <li><span>收貨人姓名：</span>{{ defaultAddress.receiver }}</li>
        <li><span>手機號碼：</span>{{ defaultAddress.contact }}</li>
        <li><span>收貨地址：</span>{{ defaultAddress.fullLocation }} {{ defaultAddress.address }}</li>
      </ul>

    </div>
    <!-- 添加地址/切換地址按鈕 -->
    <div class="action">
      <el-button size="large" type="primary" :icon="Refresh" @click="toggleFlag = true">切換地址</el-button>
    </div>
  </div>


  <!-- 切換收貨地址區域 -->
  <div class="changeAddress">
    <el-dialog title="切換收貨地址" width="35%" center v-model="toggleFlag">
      <div class="addressWrapper">
        <div class="item" v-for="item in addressList" :class="{ active: activeAddress?.id === item.id }" :key="item.id"
          @click="payOrderStore.switchAddress(item)">
          <ul>
            <li><span>收貨人姓名：</span>{{ item.receiver }}</li>
            <li><span>手機號碼：</span>{{ item.contact }}</li>
            <li><span>收貨地址：</span>{{ item.fullLocation + item.address }}</li>
          </ul>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="payOrderStore.onChangeAddress">確認更換</el-button>
          <el-button @click="toggleFlag = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<style lang="scss" scoped>
// 收貨地址區域
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  // 收貨地址區塊內容
  .addressData {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    // 如果用戶沒有收貨地址的話 所顯示的部分
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    // 如果有收貨地址的話 所顯示的部分
    >ul {
      flex: 1;
      padding: 20px;

      li {
        font-size: 16px;
        line-height: 30px;

        span {
          color: #999;
          margin-right: 10px;
        }
      }
    }
  }

  // 添加 / 切換收貨地址按鈕部分
  .action {
    margin-right: 30px;
  }

}

// 切換收貨地址區域
.changeAddress {
  .addressWrapper {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;

    // 收貨人資料
    .item {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s ease;

      >ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }

      &.active,
      &:hover {
        transform: scale(1.05);
        border-color:$mainColor;
        background: lighten($mainColor, 50%);

      }
    }
  }
}
</style>