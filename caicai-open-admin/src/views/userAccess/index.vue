<template>
  <!-- 用户访问记录自动刷新列表实时查看前端页面访问记录 -->
  <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
    <div class="flex justify-between align-center my-4">
      <div class="">
        <el-input
          placeholder="请输入用户名"
          v-model="searchForm.userName"
          style="width: 200px"
        />
        <el-button
          type="primary"
          class="ml-2"
          :disabled="loading"
          :loading="loading"
          @click="search"
          >查询</el-button
        >
      </div>
    </div>
    <div class="overflow-x-auto">
      <el-table
        :loading="loading"
        :data="accessLogs"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="requestIp" label="请求IP" />
        <el-table-column label="请求时间" width="180" >
          <template #default="scope">
            {{ formatDate(new Date(scope.row.requestTime)) }}

          </template>
        </el-table-column>
        <el-table-column prop="api" label="访问API" width="150" />
        <el-table-column prop="requestUrl" label="请求URL" width="300" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="uuid" label="用户ID" />
      </el-table>
    </div>
    <div class="mt-4 text-sm text-gray-500 flex justify-between items-center">
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
      <div>
        <span>自动刷新间隔: {{ refreshInterval }}秒</span>
        <button
          @click="toggleRefresh"
          class="px-3 py-1 mx-3 bg-blue-500! text-white rounded hover:bg-blue-600! transition-colors"

        >
          {{ isRefreshing ? "停止刷新" : "开始刷新" }}
        </button>
        <button
          @click="clearAccessLogs"
          class="px-3 py-1 bg-red-500! text-white rounded hover:bg-red-600! transition-colors"
        >
          清空记录
        </button>
      </div>
    </div>
  </div>

  <!-- 统计图表 -->
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div ref="chartViewsRef" class="w-full h-[400px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
import { formatDate } from "@/utils/index";
import { getWebAccessList, deleteWebAccess } from "@/api/access";
import { ElMessage,ElMessageBox } from "element-plus";

import * as echarts from "echarts";

const loading = ref(false);
const searchForm = ref({
  userName: "",
});
// 分页变量
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const handleCurrentChange = (val) => {
  page.value = val;
  fetchAccessLogs();
}

// 用户访问记录相关变量
const accessLogs = ref([]);
const accessLogsChart = ref([]);


const isRefreshing = ref(false);
const refreshInterval = ref(5);
let refreshTimer = null;

// 获取用户访问记录
const fetchAccessLogs = async () => {
  // 实际请求后端API获取访问记录
  try {
    if(accessLogsChart.value.length === 0) {
      let {data} = await getWebAccessList({
        page: 1,
        pageSize: 1000000,
      });
      accessLogsChart.value = data;
      updateChartData();
    }

    loading.value = true;
    const res = await getWebAccessList({
      page: page.value,
      pageSize: pageSize.value,
    });
    accessLogs.value = res.data;
    total.value = res.total;
  } catch (error) {
    ElMessage.error('获取用户访问记录失败',error.message);
  } finally {
    loading.value = false;
  }
};
fetchAccessLogs();

// 切换自动刷新状态
const toggleRefresh = () => {
  isRefreshing.value = !isRefreshing.value;
  if (isRefreshing.value) {
    startRefresh();
  } else {
    stopRefresh();
  }
};

// 开始自动刷新
const startRefresh = () => {
  stopRefresh(); // 确保之前的定时器已停止
  fetchAccessLogs(); // 立即获取一次数据
  refreshTimer = setInterval(fetchAccessLogs, refreshInterval.value * 1000);
};

// 停止自动刷新
const stopRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
};

// 清空访问记录
const clearAccessLogs = async () => {
  try {
    ElMessageBox.confirm('确定清空所有访问记录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await deleteWebAccess();
      ElMessage.success('清空成功');
      fetchAccessLogs();
    });
  } catch (error) {
    ElMessage.error('清空失败',error.message);
  }
}

// 搜索
const search = async () => {
  try {
    loading.value = true;

    if (!searchForm.value.userName) {
      fetchAccessLogs();
      return;
    }
    const res = await getWebAccessList({
      page: page.value,
      pageSize: pageSize.value,
      userName: searchForm.value.userName,
    });
    accessLogs.value = res.data;
    total.value = res.total;
  } catch (error) {
    ElMessage.error('搜索失败',error.message);
  } finally {
    loading.value = false;
  }
}


// 统计图表
const chartViewsRef = ref(null);
const chartViews = ref(null);


// API请求统计图表数据
const chartOptions = ref({
  title: {
    text: "API请求次数统计",
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b}: {c}次",
  },

  xAxis: {
    type: "category",
    data: [
      "/api/test1",
      "/api/test2",
      "/api/test3",
      "/api/test4",
      "/api/test5",
    ],
    axisLabel: {
      interval: 0,
      //   rotate: 30
    },
  },
  yAxis: {
    type: "value",
    name: "请求次数",
  },
  series: [
    {
      name: "请求次数",
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
      data: [10, 8, 12, 5, 7],
    },
  ],
});

// 更新图表数据
const updateChartData = () => {
  // 从访问记录中统计每个API的请求次数
  const apiCounts = {};
  accessLogsChart.value.forEach((log) => {
    if (apiCounts[log.api]) {
      apiCounts[log.api]++;
    } else {
      apiCounts[log.api] = 1;
    }
  });

  // 准备图表数据
  const apiNames = Object.keys(apiCounts);
  const counts = Object.values(apiCounts);

  // 更新图表配置
  chartOptions.value.xAxis.data = apiNames;
  chartOptions.value.series[0].data = counts;

  // 重新渲染图表
  if (chartViews.value) {
    chartViews.value.setOption(chartOptions.value);
  }
};

// 确保初始化代码正确
onMounted(() => {
  chartViews.value = echarts.init(chartViewsRef.value);
  chartViews.value.setOption(chartOptions.value);

  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener("resize", () => {
    chartViews.value.resize();
  });
});


// 在组件卸载时停止刷新
onUnmounted(() => {
  stopRefresh();
});
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
</style>
