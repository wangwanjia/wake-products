<script setup>
import * as echarts from "echarts";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { House, UserFilled } from '@element-plus/icons-vue'

const chartRef = ref(null); // DOM 绑定引用
let chartInstance = null; // 保存 ECharts 实例

onMounted(() => {
  // 初始化 ECharts 实例
  chartInstance = echarts.init(chartRef.value);

  // 设置图表配置项
  const option = {
    title: {
      text: "Vue 3 + ECharts 示例",
    },
    tooltip: {},
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10],
      },
    ],
  };

  chartInstance.setOption(option);

  // 自动响应式尺寸
  window.addEventListener("resize", chartInstance.resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", chartInstance?.resize);
  chartInstance?.dispose();
});

defineProps({
  msg: String,
});
const count = ref(0);
</script>

<template>
  <div ref="chartRef" class="w-full h-64"></div>

  <h1 class="text-3xl font-bold underline">Hello world!  </h1>
  <el-icon><House /></el-icon>
  <el-icon><UserFilled /></el-icon>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>  
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs text-2xl">Click on the Vite and Vue logos to learn more</p>
</template>

<style lang="postcss" scoped>
.read-the-docs {
  color: #888;

  .icon {
    width: 20px;
  }
}
</style>
