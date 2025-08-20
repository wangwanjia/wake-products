<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane name="index">
      <!-- 用户访问记录自动刷新列表实时查看用户信息 -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
        <!-- 删除确认对话框 -->
        <el-dialog v-model="deleteDialogVisible" title="确认删除" width="30%">
          <div>
            确定要删除这条
            <span class="font-semibold text-red-500">{{
              currentDeleteView?.userName || ""
            }}</span>
            的访问记录吗？
          </div>
          <template #footer>
            <div class="flex justify-end gap-2">
              <el-button type="primary" @click="deleteDialogVisible = false"
                >取消</el-button
              >
              <el-button
                class="bg-(--el-color-danger)! border-0!"
                type="danger"
                @click="confirmDelete"
                >确认删除</el-button
              >
            </div>
          </template>
        </el-dialog>

        <!-- 批量删除确认对话框 -->
        <el-dialog
          v-model="batchDeleteDialogVisible"
          title="批量删除确认"
          width="30%"
        >
          <div>
            确定要删除选中的
            <span class="font-semibold text-red-500">{{
              multipleSelection.length
            }}</span>
            条访问记录吗？
          </div>
          <template #footer>
            <div class="flex justify-end gap-2">
              <el-button
                type="primary"
                @click="batchDeleteDialogVisible = false"
                >取消</el-button
              >
              <el-button
                class="bg-(--el-color-danger)! border-0!"
                type="danger"
                @click="confirmBatchDelete"
                >确认删除</el-button
              >
            </div>
          </template>
        </el-dialog>

        <!-- 内容 -->
        <h3 class="text-lg font-semibold mb-4 text-gray-800">访问记录管理</h3>
        <div class="flex justify-between align-center my-4">
          <div class="seach">
            <el-input
            placeholder="请输入用户名"
            v-model="searchName"
            style="width: 200px"
          />
          <el-button
            type="primary"
            class="ml-2"
            :disabled="loading"
            :loading="loading"
            @click="getViewData"
            >查询</el-button
          >
          </div>
          <div>
            <el-button type="primary" class="ml-2" @click="addView"
              >添加访问记录</el-button
            >
          </div>
        </div>
        <div class="overflow-x-auto">
          <el-table
            ref="multipleTableRef"
            :data="viewData"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              :selectable="selectable"
              width="38"
            />
            <el-table-column prop="createdAt" label="访问时间" width="180" >
              <template #default="scope">
                {{formatDate(new Date(scope.row.createdAt), 'yyyy-MM-dd HH:mm:ss') }}
              </template>
            </el-table-column>
           
            <el-table-column prop="userName" label="用户名" />
             <el-table-column prop="userId" label="用户ID" />
             <el-table-column prop="location" label="访问位置" />
            <el-table-column prop="deviceViews" label="设备类型" />
            <el-table-column prop="ip" label="IP地址" />
            <el-table-column label="操作" width="80" fixed="right">
              <template #default="scope">
                <div class="flex justify-center items-center gap-2">
                  <el-button
                    class="bg-(--el-color-danger)! border-0!"
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row)"
                  >
                    删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          class="mt-4 text-sm text-gray-500 flex justify-between items-center flex-wrap max-md:gap-2"
        >
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              v-model:current-page="page"
              v-model:page-size="pageSize"
              @current-change="getViewData"
              :total="total"
            />
          </div>
          <div class="flex">
            <el-button
              class="bg-(--el-color-danger)! border-0!"
              type="primary"
              @click="handleBatchDelete"
              :disabled="multipleSelection.length === 0"
              >批量删除</el-button
            >
            <el-button
              class="bg-(--el-color-danger)! border-0!"
              type="primary"
              @click="handleClearViews"
              >清空访问记录</el-button
            >
          </div>
        </div>
      </div>

      <!-- 统计图表 -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <div ref="chartViewsRef" class="w-full h-[400px]"></div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="child">
      <router-view></router-view>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as echarts from "echarts";
import { getAllViews,searchViewsByUserName,deleteViews,clearViews,get24HoursViewStats } from "@/api/views";
import { ElMessage } from "element-plus";
import { formatDate } from "@/utils/index";



const router = useRouter();
const route = useRoute();

const activeName = ref("index");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

watch(
  () => route.path,
  (newVal) => {
    if (newVal === "/admin/userViews") {
      activeName.value = "index";
      getViewData();
      getViewDataChart();
    } else {
      activeName.value = "child";
    }
  }
);

// 分页变量
const page = ref(1);
const pageSize = ref(10);
const total = ref(90);

// 多选数据 批量处理
const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 删除对话框相关变量
const deleteDialogVisible = ref(false);
const currentDeleteView = ref(null);


// 批量删除对话框相关变量
const batchDeleteDialogVisible = ref(false);

// 用户访问记录相关变量
const loading = ref(false);

const handleDelete = (view) => {
  currentDeleteView.value = view;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = async () => {
  if (currentDeleteView.value) {
    try {
      const res = await deleteViews([currentDeleteView.value.id]);
      if (res.success) {
        ElMessage.success('删除成功');
        getViewData();
      } else {
        ElMessage.error('删除失败');
      }
    } catch (error) {
      ElMessage.error('删除失败', error.message);
    }finally{
      deleteDialogVisible.value = false;
      currentDeleteView.value = null;
    }
  }
};

// 处理批量删除
const handleBatchDelete = () => {
  if (multipleSelection.value.length > 0) {
    batchDeleteDialogVisible.value = true;
  }else{
    ElMessage.warning('请选择要删除的订单');
  }
};

// 确认批量删除
const confirmBatchDelete = async () => {
  try {
    const res = await deleteViews(multipleSelection.value.map((item) => item.id));
    if (res.success) {
      ElMessage.success('删除成功');
      getViewData();
      multipleSelection.value = [];
    } else {
      ElMessage.error('删除失败');
    }
  } catch (error) {
    ElMessage.error('删除失败', error.message);
  }finally{
    batchDeleteDialogVisible.value = false;
  }
};

const searchName = ref('');
// 订单数据
const viewData = ref([]);
// 获取订单数据
const getViewData = async () => {
  loading.value = true;
  try {
    if(searchName.value){
      let params = {
        userName: searchName.value,
        page: page.value,
        pageSize: pageSize.value,
      }
      let res = await searchViewsByUserName(params,{
        page: page.value,
        pageSize: pageSize.value,
      });
      if (res.success) {
        viewData.value = res.data;
        total.value = res.total;
      }
    }else{
      
      let res = await getAllViews({
        page: page.value,
        pageSize: pageSize.value,
      });
       
      if (res.success) {
        viewData.value = res.data;
        total.value = res.total;
      }
    }
  } catch (error) {
    ElMessage.error('获取访问记录数据失败',error.message);
  } finally {
   
  
    loading.value = false;
  }
};
getViewData();

// 清空订单
const handleClearViews = async () => {
  try {
    const res = await clearViews();
    if (res.success) {
      ElMessage.success('清空成功');
      getViewData();
    } else {
      ElMessage.error('清空失败');
    }
  } catch (error) {
    ElMessage.error('清空失败', error.message);
  }
}


// 统计图表
const chartViewsRef = ref(null);
const chartViews = ref(null);
const viewDateArr = ref([]);
const viewDateNum = ref([]);

const getViewDataChart = async () => {
  try {
   
    const res = await get24HoursViewStats();
    if (res.success) {
      viewDateArr.value = res.data.xAxis;
      viewDateNum.value = res.data.yAxis;

        // 更新图表选项
      chartOptions.value.xAxis.data = res.data.xAxis;
      chartOptions.value.series[0].data = res.data.yAxis; 
      if (chartViews.value) {
        chartViews.value.setOption(chartOptions.value);
      }
    }
  } catch (error) {
    ElMessage.error('图表获取访问记录数据失败',error.message);
  }
};
getViewDataChart();

// 访问记录每天注册量
const chartOptions = ref({
  title: {
    text: "24小时访问记录",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}条",
  },

  xAxis: {
    type: "category",
    name: "时间",
    data: viewDateArr.value,

  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "访问记录",
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
      data: viewDateNum.value,  
    },
  ],
});

// 添加访问记录
const addView = () => {
  router.push({
    path: "/admin/userViews/viewAdd",  
  });
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
:deep(.el-checkbox__inner:hover){
  border-color: var(--primary) !important;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--primary);
  color: white;
}

:deep(.el-tabs__header) {
  display: none;
}
</style>
