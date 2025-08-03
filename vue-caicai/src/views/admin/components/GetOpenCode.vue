<template>
  <!-- 获取开奖数据 -->
  <el-tabs v-model="activeName" class="tabs-get-open" @tab-click="handleClick">
    <el-tab-pane label="新澳门" name="新澳门">
      <div
        class="flex justify-start align-center py-4 border-b-2 border-b-gray-200"
      >
        <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="handleGetOpenCodeYear"
              >新澳门 获取开奖数据 近两年</el-button
            >

            <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="handleGetOpenCodeNew"
              >新澳门 获取当前最新一期</el-button
            >
      </div>
    </el-tab-pane>
    <el-tab-pane label="澳门" name="澳门">
        <div
        class="flex justify-start align-center py-4 border-b-2 border-b-gray-200"
      >
        <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="handleGetOpenCodeYear"
              >澳门 获取开奖数据 近两年</el-button
            >

            <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="handleGetOpenCodeNew"
              >澳门 获取当前最新一期</el-button
            >
      </div>
    </el-tab-pane>
    <el-tab-pane label="香港" name="香港">
        <div
        class="flex justify-start align-center py-4 border-b-2 border-b-gray-200"
      >
        <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="handleGetOpenCodeYear"
              >香港 获取开奖数据 近两年</el-button

            >

            <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="handleGetOpenCodeNew"
              >香港 获取当前最新一期</el-button
            >
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 父级传递最顶一期数据
const props = defineProps({
  topOpenCodeDate: {
    type: String,
    default: new Date().toISOString().split('T')[0],
  },
})

const activeName = ref("新澳门");  // 新澳门、澳门、香港

const handleGetOpenCodeYear = async () => {
  try {
    if (activeName.value === "新澳门") {
      await getOpenCodeYearNewMacao();
    } else if (activeName.value === "澳门") {
      await getOpenCodeYearMacao();
    } else if (activeName.value === "香港") {
      await getOpenCodeYearHongkong();
    }
    ElMessage.success("获取成功");
  } catch (error) {
    ElMessage.error("获取失败");
  }
}

const handleGetOpenCodeNew = async () => {
  try {
    // 最新一期数据是否是今天
     let isNewDate = new Date(props.topOpenCodeDate).toISOString().split('T')[0]===new Date().toISOString().split('T')[0];
    if (isNewDate) {
      ElMessage.error("最新一期数据是今天，不能获取最新一期数据");
      return;
    }

    if (activeName.value === "新澳门") {
      await getOpenCodeNewMacao();
    } else if (activeName.value === "澳门") {
      await getOpenCodeMacao();
    } else if (activeName.value === "香港") {
      await getOpenCodeHongkong();
    }
    ElMessage.success("获取成功");
  } catch (error) {
    ElMessage.error("获取失败");
  }
}

</script>

<style scoped>
.tabs-get-open :deep(.el-tabs__header) {
  display: block !important;
}
.tabs-get-open :deep(.el-tabs__item){
    font-size: 18px;
    font-weight: bold;
}
.tabs-get-open :deep(.el-tabs__item.is-active){
    color: var(--primary);
}
.tabs-get-open :deep(.el-tabs__item:hover){
    color: var(--primary);
}
.tabs-get-open :deep(.el-tabs__active-bar){
    background-color: var(--primary);
}

</style>
