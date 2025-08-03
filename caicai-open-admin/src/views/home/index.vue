<template>
  <div class=" ">
    <!-- 统计 -->
    <ul class="flex items-center justify-between max-md:flex-col gap-4">
      <li
        class="basis-full w-full h-[90px] p-2 center shadow-md border border-solid border-gray-300 rounded-md"
      >
        <div class="flex items-center justify-between gap-4">
          <Icon name="用户量" width="32" height="32" />
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm md:text-md">用户量</p>
            <h4 class="text-md md:text-lg font-bold">78787</h4>
          </div>
        </div>
      </li>
      <li
        class="basis-full w-full h-[90px] p-2 center shadow-md border border-solid border-gray-300 rounded-md"
      >
        <div class="flex items-center justify-between gap-4">
          <Icon name="订单量" width="32" height="32" />
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm md:text-md">API请求量</p>
            <h4 class="text-md md:text-lg font-bold">78787</h4>
          </div>
        </div>
      </li>
     
    </ul>

    <!-- 访问图表 -->
    <div class="w-full mt-10">
      <div ref="viewNumRef" class="w-full h-[300px]"></div>
    </div>

    <!-- 地区访问 -->
    <div class="w-full mt-10 pb-10">
      <div ref="areaNumRef" class="w-full h-[800px]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
import * as echarts from "echarts";
import { onMounted } from "vue";

const viewNumRef = ref(null);
const areaNumRef = ref(null);
let viewNumChart = null;
let areaNumChart = null;

const viewNumData = {
  title: {
    text: "每天请求量统计",
    left: "center",
    top: 20,
    textStyle: {
      color: "#333",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}个",
  },
  xAxis: {
    type: "category",
    data: ["7月25", "7月26", "7月27", "7月28", "7月29", "7月30", "7月31"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
    },
  ],
};

// 模拟省份访问数据
const areaData = [
  { name: "北京", value: 12345 },
  { name: "上海", value: 23456 },
  { name: "广东", value: 34567 },
  { name: "江苏", value: 19876 },
  { name: "浙江", value: 18765 },
  { name: "山东", value: 15678 },
  { name: "河南", value: 14567 },
  { name: "四川", value: 13456 },
  { name: "湖北", value: 12345 },
  { name: "福建", value: 11234 },
  { name: "湖南", value: 10123 },
  { name: "安徽", value: 9012 },
  { name: "河北", value: 8901 },
  { name: "陕西", value: 7890 },
  { name: "江西", value: 6789 },
  { name: "重庆", value: 5678 },
  { name: "云南", value: 4567 },
  { name: "辽宁", value: 3456 },
  { name: "黑龙江", value: 2345 },
  { name: "广西", value: 1234 },
  { name: "山西", value: 1123 },
  { name: "贵州", value: 1012 },
  { name: "吉林", value: 901 },
  { name: "内蒙古", value: 890 },
  { name: "天津", value: 789 },
  { name: "海南", value: 678 },
  { name: "甘肃", value: 567 },
  { name: "新疆", value: 456 },
  { name: "青海", value: 345 },
  { name: "宁夏", value: 234 },
  { name: "西藏", value: 123 },
  { name: "香港", value: 98 },
  { name: "澳门", value: 76 },
  { name: "台湾", value: 54 },
];

// 格式化数据，确保正确映射 name 和 value
let formattedData = areaData.map((item) => {
  return {
    name: item.name,
    value: item.value,
  };
});

// 按 value 降序排序
formattedData.sort((a, b) => b.value - a.value);

// 根据排序后的结果提取城市名称用于 y 轴
const cityNames = formattedData.map((item) => item.name);

const areaNumData = {
  title: {
    text: "API请求量排名",
    left: "center",
    top: 10,
    textStyle: {
      color: "#333",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: "{b}: {c}",
  },
  xAxis: {
    type: "value",
    name: "访问量",
  },
  yAxis: {
    type: "category",
    data: cityNames,
    inverse: true,
    name: "城市",
    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      name: "地区访问量",
      type: "bar",
      data: formattedData,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
      itemStyle: {
        color: "#039e6d",
      },
    },
  ],
};

// 确保初始化代码正确
onMounted(() => {
  // 初始化访问量图表
  viewNumChart = echarts.init(viewNumRef.value);
  viewNumChart.setOption(viewNumData);

  // 初始化地区访问图表
  areaNumChart = echarts.init(areaNumRef.value);
  areaNumChart.setOption(areaNumData);

  // 自适应
  window.addEventListener("resize", () => {
    viewNumChart.resize();
    areaNumChart.resize();
  });
});
</script>

<style scoped></style>
