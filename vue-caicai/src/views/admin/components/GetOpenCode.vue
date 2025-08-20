<template>
  <!-- 获取开奖数据 -->
  <el-tabs v-model="activeName" class="tabs-get-open">
    <el-tab-pane
      v-for="item in navList"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
      <div
        class="flex justify-start align-center py-4 border-b-2 border-b-gray-200"
      >
        <el-button
          type="primary"
          class="ml-2"
          :disabled="loading"
          @click="handleGetOpenCodeYear"
          >{{ item.label }} 获取历史开奖数据</el-button
        >
        <el-button
          type="primary"
          class="ml-2"
          :disabled="loading"
          @click="handleGetOpenCodeNew"
          >{{ item.label }} 获取当前最新一期</el-button
        >
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getOpenCodeYear, getOpenCodeNew } from "@/api/openCode";



// 父级传递最顶一期数据
const props = defineProps({
  topOpenCodeDate: {
    type: String,
    default: new Date().toISOString().split("T")[0],
  },
  resultDataYear: {
    type: Array,
    default: () => [],
  },

});

const activeName = ref("newMacao"); // 新澳门、澳门、香港
const loading = ref(false);
const navList = [
  {
    label: "新澳门",
    name: "newMacao",
  },
  {
    label: "澳门",
    name: "macao",
  },
  {
    label: "香港",
    name: "hongKong",
  },
];

const handleGetOpenCodeYear = async () => {
  try {
    loading.value = true;
    if(props.resultDataYear.length > 0){
      ElMessage.warning("请先清空数据");
      return;
    }
    await getOpenCodeYear(activeName.value);
    window.handleGetOpenCodeList();  //重新获取数据列表
    ElMessage.success("获取成功");
  } catch (error) {
    ElMessage.error("获取失败");
  } finally {
    loading.value = false;
  }
};

const handleGetOpenCodeNew = async () => {
  try {
    loading.value = true;
    // 最新一期数据是否是今天
    if(props.resultDataYear.length > 0){
      let newDate = new Date(props.resultDataYear[0].openTime).toISOString().split("T")[0];
      let nowDate = new Date().toISOString().split("T")[0];
      let isNewDate = newDate === nowDate;

      console.log(newDate, nowDate,999);
      if (isNewDate) {
        ElMessage.warning("最前已是最新");
        return;
      }
    }

    await getOpenCodeNew(activeName.value);
    window.handleGetOpenCodeList();  //重新获取数据列表
    ElMessage.success("获取成功");
  } catch (error) {
    ElMessage.error("获取失败");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.tabs-get-open :deep(.el-tabs__header) {
  display: block !important;
}
.tabs-get-open :deep(.el-tabs__item) {
  font-size: 18px;
  font-weight: bold;
}
.tabs-get-open :deep(.el-tabs__item.is-active) {
  color: var(--primary);
}
.tabs-get-open :deep(.el-tabs__item:hover) {
  color: var(--primary);
}
.tabs-get-open :deep(.el-tabs__active-bar) {
  background-color: var(--primary);
}
</style>
