<template>
  <el-tabs v-model="activeNamePage" class="tabs-index" @tab-click="handleClick">
    <el-tab-pane name="index">
      <el-tabs
        v-model="activeNameTag"
        class="tabs-get-open"
        @tab-click="handleClick"
      >
        <el-tab-pane label="新澳门" name="新澳门">
          <GetOpenCodeNewMacao :isActive="activeNameTag == '新澳门'"></GetOpenCodeNewMacao>
        </el-tab-pane>
        <el-tab-pane label="澳门" name="澳门">
          <GetOpenCodeMacao :isActive="activeNameTag == '澳门'"></GetOpenCodeMacao>
        </el-tab-pane>
        <el-tab-pane label="香港" name="香港">
          <GetOpenCodeHongKong :isActive="activeNameTag == '香港'"></GetOpenCodeHongKong>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="child">
      <router-view></router-view>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
defineOptions({ name: "ResultsManageIndex" });
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import GetOpenCodeNewMacao from "../components/GetOpenCodeNewMacao.vue";
import GetOpenCodeMacao from "../components/GetOpenCodeMacao.vue";
import GetOpenCodeHongKong from "../components/GetOpenCodeHongKong.vue";

const router = useRouter();
const route = useRoute();

// 路由切换
const activeNamePage = ref("index");
const activeNameTag = ref("新澳门");  // 新澳门、澳门、香港

watch(
  () => route.path,
  (newVal) => {
    if (newVal === "/resultsManage") {
      activeNamePage.value = "index";
    } else {
      activeNamePage.value = "child";
    }
  }
);

</script>

<style scoped>
:deep(.el-button) {
  background-color: var(--primary);
  border-color: var(--primary);
}

:deep(.el-pagination.is-background .btn-next.is-active) {
  background-color: var(--primary);
}
:deep(.el-pagination.is-background .btn-prev.is-active) {
  background-color: var(--primary);
}
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: var(--primary);
}
:deep(.el-pager li.is-active) {
  color: var(--primary);
}
:deep(.el-pager li:hover) {
  color: var(--primary);
}
:deep(.el-pagination button:hover) {
  color: var(--primary);
}
:deep(.el-pagination button.is-active) {
  color: var(--primary);
}
:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary) !important;
}
:deep(.el-checkbox__inner:hover) {
  border-color: var(--primary) !important;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--primary);
  color: white;
}

.tabs-index :deep(.el-tabs__header) {
  display: none;
}
:deep(.el-range-editor.is-active, .el-range-editor.is-active:hover) {
  box-shadow: 0 0 0 1px var(--primary) !important;
}


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