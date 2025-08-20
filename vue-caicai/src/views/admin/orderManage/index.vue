<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane name="index">
      <!-- 用户访问记录自动刷新列表实时查看用户信息 -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
        <!-- 删除确认对话框 -->
        <el-dialog v-model="deleteDialogVisible" title="确认删除" width="30%">
          <div>
            确定要删除订单
            <span class="font-semibold text-red-500">{{
              currentDeleteOrder?.id || ""
            }}</span>
            吗？
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
            个订单吗？
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
        <h3 class="text-lg font-semibold mb-4 text-gray-800">订单管理</h3>
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
            @click="handleSearch"
            >查询</el-button
          >
          </div>
          <div>
            <el-button type="primary" class="ml-2" @click="addOrder"
              >添加订单</el-button
            >
          </div>
        </div>
        <div class="overflow-x-auto">
          <el-table
            ref="multipleTableRef"
            :data="orderData"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              :selectable="selectable"
              width="38"
            />
            <el-table-column prop="createdAt" label="订单创建时间" width="180" >
              <template #default="scope">
                {{formatDate(new Date(scope.row.createdAt), 'yyyy-MM-dd HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column prop="id" label="订单编号" />
            <el-table-column prop="postId" label="帖子ID" />
            <el-table-column prop="postTitle" label="帖子标题" />
            <el-table-column prop="userId" label="用户ID" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="amount" label="订单金额" />
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
              @current-change="getOrderData"
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
              @click="handleClearOrders"
              >清空订单</el-button
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
import { getAllOrders,searchOrdersByUserName,deleteOrders,clearOrders } from "@/api/order";
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
    if (newVal === "/admin/orderManage") {
      activeName.value = "index";
      getOrderData();
      getOrderDataChart();
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
const currentDeleteOrder = ref(null);


// 批量删除对话框相关变量
const batchDeleteDialogVisible = ref(false);

// 用户访问记录相关变量
const loading = ref(false);

const handleDelete = (order) => {
  currentDeleteOrder.value = order;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = async () => {
  if (currentDeleteOrder.value) {
    try {
      const res = await deleteOrders([currentDeleteOrder.value.id]);
      if (res.success) {
        ElMessage.success('删除成功');
        getOrderData();
      } else {
        ElMessage.error('删除失败');
      }
    } catch (error) {
      ElMessage.error('删除失败', error.message);
    }finally{
      deleteDialogVisible.value = false;
      currentDeleteOrder.value = null;
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
    const res = await deleteOrders(multipleSelection.value.map((item) => item.id));
    if (res.success) {
      ElMessage.success('删除成功');
      getOrderData();
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
const orderData = ref([]);
// 获取订单数据
const getOrderData = async () => {
  loading.value = true;

  try {
    if(searchName.value){
      let res = await searchOrdersByUserName(searchName.value,{
        page: page.value,
        pageSize: pageSize.value,
      });
      if (res.success) {
        orderData.value = res.data;
        total.value = res.total;
      }
    }else{
      
      let res = await getAllOrders({
        page: page.value,
        pageSize: pageSize.value,
      });
       
      if (res.success) {
        orderData.value = res.data;
        total.value = res.total;
      }
    }
  } catch (error) {
    ElMessage.error('获取订单数据失败',error.message);
  } finally {
   
  
    loading.value = false;
  }
};
getOrderData();

// 用户名查询

const handleSearch = async () => {
  if (searchName.value) {
    // 清空分页数据
    page.value = 1;
    total.value = 0;
      // 执行查询
      const res = await searchOrdersByUserName(searchName.value);
      if (res.success) {
        orderData.value = res.data;
        total.value = res.total;
      }
    }else{
      getOrderData();
    }
}

// 清空订单
const handleClearOrders = async () => {
  try {
    const res = await clearOrders();
    if (res.success) {
      ElMessage.success('清空成功');
      getOrderData();
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
const orderDateArr = ref([]);
const orderDateNum = ref([]);

const getOrderDataChart = async () => {
  try {
   
    const res = await getAllOrders({
      pageSize: 100000,
    });
    if (res.success) {
      // 统计所有日期，使用formatDate格式化日期
      const allDates = res.data.map(item => formatDate(new Date(item.createdAt), 'yyyy-MM-dd'));
      // 获取当前日期
      const now = new Date();
      // 获取两个月前的日期
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
      // 过滤出近两个月的日期
      const recentDates = allDates.filter(dateStr => {
        const date = new Date(dateStr);
        return date >= twoMonthsAgo && date <= now;
      });
      // 去重获取所有不同的日期，并按日期排序
      orderDateArr.value = [...new Set(recentDates)].sort();
      // 统计每个日期的注册用户数量
      orderDateNum.value = orderDateArr.value.map(date => recentDates.filter(d => d === date).length);
        // 更新图表选项
      chartOptions.value.xAxis.data = orderDateArr.value;
      chartOptions.value.series[0].data = orderDateNum.value; 
      if (chartViews.value) {
        chartViews.value.setOption(chartOptions.value);
      }
    }
  } catch (error) {
    ElMessage.error('图表获取订单数据失败',error.message);
  }
};
getOrderDataChart();

// 订单每天注册量
const chartOptions = ref({
  title: {
    text: "订单每天注册量",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}个",
  },

  xAxis: {
    type: "category",
    name: "日期",
    data: orderDateArr.value,

  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "订单量",
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
      data: orderDateNum.value,
    },
  ],
});

// 添加订单
const addOrder = () => {
  router.push({
    path: "/admin/orderManage/orderAdd",  
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
