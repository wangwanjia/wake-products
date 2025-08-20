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
            <h4 class="text-md md:text-lg font-bold">{{ userData.total }}</h4>
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
            <h4 class="text-md md:text-lg font-bold">{{ accessData.total }}</h4>

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
import { getUsers } from "@/api/user";
import { getWebAccessList } from "@/api/access";

import { ElMessage } from "element-plus";


const userData = ref({
  total: 0,
  data: []
});
const accessData = ref({
  total: 0,
  data: []  
});


// 获取用户
const handleGetUsers = async () => {
  try {
    const res = await getUsers();
    if (res.data.length > 0) {
      userData.value = res;
      // ElMessage.success('获取用户成功');
    }
  } catch (error) {
    ElMessage.error('获取用户失败',error.message);
  }
}
handleGetUsers()

// 获取访问记录
const handleGetAccess = async () => {
  try {
    const res = await getWebAccessList();
    if (res.data.length > 0) {
      accessData.value = res;
      handleFilterArr(res.data);  //每天请求数量
      handleFilterUrl(res.data);  //每个url的请求数量
    }
  } catch (error) {
    ElMessage.error('获取访问记录失败',error.message);
  }
}
handleGetAccess()

const viewNumRef = ref(null);
const areaNumRef = ref(null);
let viewNumChart = null;
let areaNumChart = null;

let dateList = ref([]);
let viewNumList = ref([]);
const handleFilterArr = (arr) => { // 修正函数名拼写错误
  // 重置数组
  dateList.value = [];
  viewNumList.value = [];
  
  // 若传入的数组为空，直接返回
  if (!arr || arr.length === 0) {
    // 即使没有数据，也初始化图表以显示空图表
    if (viewNumChart) {
      viewNumChart.setOption({
        xAxis: { data: [] },
        series: [{ data: [] }]
      });
    }
    return;
  }
  arr.forEach(item => {
    let date = new Date(item.requestTime).toISOString().split('T')[0];
    if (!dateList.value.includes(date)) {
      dateList.value.push(date);
      viewNumList.value.push(1);
    } else {
      let index = dateList.value.indexOf(date);
      viewNumList.value[index]++;
    }
  });
  // 更新图表数据
  if (viewNumChart) {
    viewNumChart.setOption({
      xAxis: { data: dateList.value },
      series: [{ data: viewNumList.value }]
    });
    viewNumChart.resize();
  }
};
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
    data: dateList.value,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: viewNumList.value,
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
    },
  ],
};


let userNameList = ref([]);
let userNameNumList = ref([]);
const handleFilterUrl = (arr) => { // 修正函数名拼写错误
  // 重置数组
  userNameList.value = [];
  userNameNumList.value = [];
  
  // 若传入的数组为空，直接返回
  if (!arr || arr.length === 0) {
    // 即使没有数据，也初始化图表以显示空图表
    if (areaNumChart) {
      areaNumChart.setOption({
        xAxis: { data: [] },
        series: [{ data: [] }]
      });
    }
    return;
  }
  arr.forEach(item => {
    let name = item.username;
    if (!userNameList.value.includes(name)) {
      userNameList.value.push(name);
      userNameNumList.value.push(1);
    } else {
      let index = userNameList.value.indexOf(name);
      userNameNumList.value[index]++;
    }
  });
  // 更新图表数据
  if (areaNumChart) {
    areaNumChart.setOption({
      xAxis: { data: userNameList.value },
      series: [{ data: userNameNumList.value }]
    });
    areaNumChart.resize();
  }
  // 按 value 降序排序
  userNameNumList.value.sort((a, b) => a - b);
  // 取前 10 个
  userNameList.value = userNameList.value.slice(0, 10);
  userNameNumList.value = userNameNumList.value.slice(0, 10);
  // 反转数组
  userNameList.value.reverse();
  userNameNumList.value.reverse();
  // 初始化图表
  if (areaNumChart) {
    areaNumChart.setOption({
      yAxis: { data: userNameList.value },
      series: [{ data: userNameNumList.value }]
    });
    areaNumChart.resize();
  }
  console.log(userNameList.value);
  console.log(userNameNumList.value);
}



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
    data: userNameList.value,

    inverse: true,
    name: "用户",

    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      name: "用户请求量",
      type: "bar",
      data: userNameNumList.value,
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
