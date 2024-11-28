<script setup>
import { Upload } from '@element-plus/icons-vue'
</script>

<template>
  <!-- 回到頂部按鈕 -->
  <el-backtop class="backToTop" :right="100" :bottom="50" :visibility-height="350">
    <template #default>
      <el-icon><Upload /></el-icon>
    </template> 
  </el-backtop>
  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<style lang="scss" scoped>

// 回到頂部按鈕
.backToTop {
  width: 80px;
  height: 80px;
  font-size: 3rem;
  border-radius: 10px;
  color : $xtxColor;
  background-color: var(--el-bg-color-overlay);
  box-shadow: 0 0 10px rgba(39, 186, 155 , 0.8); 
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }
}
</style>