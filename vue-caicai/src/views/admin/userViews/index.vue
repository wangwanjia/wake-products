<template>
  <!-- 用户访问记录自动刷新列表实时查看前端页面访问记录 -->
  <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">用户访问记录</h3>
    <div class="overflow-x-auto">
      <el-table :data="accessLogs" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="68" />
        <el-table-column prop="time" label="访问时间" width="180"  />
        <el-table-column prop="ip" label="IP" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="device" label="设备" width="220"  />
        <el-table-column prop="userId" label="用户ID" />
        <el-table-column prop="userName" label="用户名" />
      </el-table>
    </div>
    <div class="mt-4 text-sm text-gray-500 flex justify-between items-center">
      <span>自动刷新间隔: {{ refreshInterval }}秒</span>
      <button
        @click="toggleRefresh"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {{ isRefreshing ? "停止刷新" : "开始刷新" }}
      </button>
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
import * as echarts from "echarts";
import axios from "axios";

// 用户访问记录相关变量
const accessLogs = ref([]);
const isRefreshing = ref(false);
const refreshInterval = ref(5);
let refreshTimer = null;

// 模拟获取用户访问记录
const fetchAccessLogs = () => {
  // 实际项目中这里应该是API请求
  // 为了演示，我们使用模拟数据
  const mockLogs = [
    {
      id: 1,
      time: new Date().toLocaleString(),
      ip: "192.168.1.1",
      city: "北京",
      device: "Windows 10 / Chrome",
      userId: 1,
      userName: "admin",
    },
    {
      id: 2,
      time: new Date(Date.now() - 60000).toLocaleString(),
      ip: "192.168.1.2",
      city: "上海",
      device: "MacOS / Safari",
      userId: 2,
      userName: "user1",
    },
    {
      id: 3,
      time: new Date(Date.now() - 120000).toLocaleString(),
      ip: "192.168.1.3",
      city: "广州",
      device: "Android / Firefox",
      userId: 3,
      userName: "user2",
    },
    {
      id: 4,
      time: new Date(Date.now() - 180000).toLocaleString(),
      ip: "192.168.1.4",
      city: "广州",
      device: "iOS / Safari",
      userId: 4,
      userName: "user3",
    },
    {
      id: 5,
      time: new Date(Date.now() - 240000).toLocaleString(),
      ip: "192.168.1.5",
      city: "广州",
      device: "Linux / Chrome",
      userId: 5,
      userName: "user4",
    },
  ];

  // 模拟API延迟
  setTimeout(() => {
    accessLogs.value = mockLogs;
    renderAccessLogs();
  }, 500);
};


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



// 统计图表
const chartViewsRef = ref(null);
const chartViews = ref(null);

// 修改成一天24小时的访问记录数据
const chartOptions = ref({
  title: {
    text: '用户访问记录统计',
  },
  tooltip: {
    trigger: 'item' ,
    formatter: '{b}: {c}次'
  },
  
  xAxis: {
    type: 'category',
    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    name: '访问次数',
    type: 'bar',
    itemStyle: {
        color: "#039e6d",
      },
    data: [100, 200, 150, 300, 250, 350, 400, 300, 200, 150, 100, 200, 150, 300, 250, 350, 400, 300, 200, 150, 100, 200, 150, 300],
  }],
});



// 确保初始化代码正确
onMounted(() => {
    chartViews.value = echarts.init(chartViewsRef.value);
    chartViews.value.setOption(chartOptions.value);

    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener('resize', () => {
      chartViews.value.resize();
    });
    toggleRefresh();
});

// 在组件卸载时停止刷新
onUnmounted(() => {
  stopRefresh();
});





</script>

<style scoped></style>
