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
            <h4 class="text-md md:text-lg font-bold">{{userNumRes.total}}</h4>
          </div>
        </div>
      </li>
      <li
        class="basis-full w-full h-[90px] p-2 center shadow-md border border-solid border-gray-300 rounded-md"
      >
        <div class="flex items-center justify-between gap-4">
          <Icon name="订单量" width="32" height="32" />
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm md:text-md">订单量</p>
            <h4 class="text-md md:text-lg font-bold">{{orderNumRes.data.totalOrders}}</h4>
          </div>
        </div>
      </li>
      <!-- 订单总金额 -->
       <li
        class="basis-full w-full h-[90px] p-2 center shadow-md border border-solid border-gray-300 rounded-md"
      >
        <div class="flex items-center justify-between gap-4">
          <Icon name="总金额" width="32" height="32" />
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm md:text-md">订单总金额</p>
            <h4 class="text-md md:text-lg font-bold">{{orderNumRes.data.totalAmount}}</h4>
          </div>
        </div>
      </li>
      <li
        class="basis-full w-full h-[90px] p-2 center shadow-md border border-solid border-gray-300 rounded-md"
      >
        <div class="flex items-center justify-between gap-4">
          <Icon name="帖子数量" width="32" height="32" />
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm md:text-md">帖子数量</p>
            <h4 class="text-md md:text-lg font-bold">78787</h4>
          </div>
          <div
            class="flex flex-col items-center justify-center gap-2 min-w-[90px]"
          >
            <div class="center text-xs!">收费：12323</div>
            <div class="center text-xs!">精选：12323</div>
            <div class="center text-xs!">热门：12323</div>
          </div>
        </div>
      </li>
      <li
        class="basis-full w-full h-[90px] p-2 center shadow-md border border-solid border-gray-300 rounded-md"
      >
        <div class="flex items-center justify-between gap-4">
          <Icon name="设备" width="32" height="32" />
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm md:text-md">访问量</p>
            <h4 class="text-md md:text-lg font-bold">{{deviceNumRes.data.totalViews}}</h4>

          </div>
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="center text-xs gap-1">
              <Icon name="电脑" width="18" height="18" />
              <span>{{deviceNumRes.data.desktop}}</span>
            </div>
            <div class="center text-xs gap-1">
              <Icon name="手机" width="18" height="18" />
              <span>{{deviceNumRes.data.mobile}}</span>
            </div>
            <div class="center text-xs gap-1">
              <Icon name="平板" width="18" height="18" />
              <span>{{deviceNumRes.data.tablet}}</span>
            </div>
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
import {getUsers} from "@/api/user";
import {getOrderStats} from "@/api/order";
import {getDeviceTypeStats,getMonthlyViewStats,getViewLocationStats} from "@/api/views";


// 获取数据
const userNumRes = ref({
  total: 0,
})
const orderNumRes = ref({
  data:{
    totalOrders: 0,
    totalAmount: 0,
  }
})
const deviceNumRes = ref({
  data:{
    desktop: 0,
    mobile: 0,
    tablet: 0,
    totalViews: 0,
  }
})
const monthlyViewRes = ref({
  data:{
    xAxis: [],
    yAxis: [],
  }
})

const areaNumRes = ref({
  data:{
    xAxis: [],
    yAxis: [],
  }
})



const getStats = async () => {
  try {
    userNumRes.value = await getUsers();
    orderNumRes.value = await getOrderStats();
    deviceNumRes.value = await getDeviceTypeStats();
    let deviceData = deviceNumRes.value.data;
    deviceNumRes.value.data.totalViews =  Number(deviceData.desktop) + Number(deviceData.mobile) + Number(deviceData.tablet);

  } catch (error) {
    console.log(error);
  }
}
getStats();


const viewNumRef = ref(null);
const areaNumRef = ref(null);
let viewNumChart = ref(null);
let areaNumChart = ref(null);

// 两个月访问访问数据
const handleGetMonthlyViewStats = async () => {
  try {
    let res = await getMonthlyViewStats();

    if(res.success == true){
      monthlyViewRes.value = res;
    // 初始化图表
    // 更新图表选项
      viewNumData.value.xAxis.data = monthlyViewRes.value.data.xAxis;
      viewNumData.value.series[0].data = monthlyViewRes.value.data.yAxis; 
      if (viewNumChart.value) {
        viewNumChart.value.setOption(viewNumData.value);
      }
    }else{
      ElMessage.error(res.error);
    }
  } catch (error) {
    console.log(error);
  }
}
handleGetMonthlyViewStats();


const viewNumData = ref(
  {
  title: {
    text: "访问量统计",
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
    data: monthlyViewRes.value.data.xAxis,

  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: monthlyViewRes.value.data.yAxis,
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
    },
  ],
}
)

// 获取地区数据
const handleGetAreaNumStats = async () => {
  try {
    let res = await getViewLocationStats();

    if(res.success == true){
      areaNumRes.value = res;
      // 将城市和访问量数据组合成数组
      const combinedData = areaNumRes.value.data.xAxis.map((city, index) => ({
        city,
        value: areaNumRes.value.data.yAxis[index]
      }));

      // 按照访问量降序排序
      combinedData.sort((a, b) => b.value - a.value);

      // 更新图表数据
      areaNumData.value.yAxis.data = combinedData.map(item => item.city);
      areaNumData.value.series[0].data = combinedData.map(item => item.value);
      if (areaNumChart.value) {
        areaNumChart.value.setOption(areaNumData.value);
      }
    }else{
      ElMessage.error(res.error);
    }
  } catch (error) {
    console.log(error);
  }
}
handleGetAreaNumStats();

const areaNumData = ref({
  title: {
    text: "地区访问量",
    left: "center",
    top: 20,
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
    data: [], // 初始化为空数组，后续通过接口数据更新
    inverse: true,
    name: "城市",
    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      name: "地区访问量",
      type: "bar",
      data: [], // 初始化为空数组，后续通过接口数据更新
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
});
// 确保初始化代码正确
onMounted(() => {
  // 初始化访问量图表
  viewNumChart.value = echarts.init(viewNumRef.value);
  viewNumChart.value.setOption(viewNumData.value);


  // 初始化地区访问图表
  areaNumChart.value = echarts.init(areaNumRef.value);
  areaNumChart.value.setOption(areaNumData.value);

  
  // 自适应
  window.addEventListener("resize", () => {
    viewNumChart.value.resize();
    areaNumChart.value.resize();
  });
});
</script>

<style scoped></style>
