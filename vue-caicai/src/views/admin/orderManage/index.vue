<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane name="index">
      <!-- 订单管理 -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
        <!-- 删除确认对话框 -->
        <el-dialog v-model="deleteDialogVisible" title="确认删除" width="30%">
          <div>
            确定要删除订单
            <span class="font-semibold text-red-500">{{
              currentDeleteOrder?.orderNo || ""
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
        <div class="flex align-center my-4">
          <el-input
            placeholder="请输入订单号"
            v-model="orderNo"
            style="width: 200px"
          />
          <el-button
            type="primary"
            class="ml-2"
            :disabled="loading"
            :loading="loading"
            @click="searchOrder"
            >查询</el-button
          >
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
            <el-table-column prop="id" label="ID" width="58" />
            <el-table-column prop="orderNo" label="订单号" minWidth="180" />
            <el-table-column prop="customerName" label="客户名称" minWidth="120" />
            <el-table-column prop="orderAmount" label="订单金额" minWidth="100" />
            <el-table-column prop="orderStatus" label="订单状态" minWidth="100"  />
            <el-table-column prop="createTime" label="创建时间" minWidth="160" />
            <el-table-column prop="paymentTime" label="支付时间" minWidth="160" />
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button
                  class="text-white! border-0!"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  class="bg-(--el-color-danger)! border-0!"
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
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
            <el-button type="primary" class="ml-2" @click="addOrder"
              >添加订单</el-button
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
  console.log(multipleSelection.value);
};

// 删除对话框相关变量
const deleteDialogVisible = ref(false);
const currentDeleteOrder = ref(null);

// 批量删除对话框相关变量
const batchDeleteDialogVisible = ref(false);

// 订单相关变量
const loading = ref(false);
const orderNo = ref("");

// 处理删除操作
const handleDelete = (order) => {
  currentDeleteOrder.value = order;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = () => {
  if (currentDeleteOrder.value) {
    // 这里可以添加实际的删除API调用
    // 模拟删除操作
    const index = orderData.findIndex(
      (item) => item.id === currentDeleteOrder.value.id
    );
    if (index !== -1) {
      orderData.splice(index, 1);
      console.log("删除订单:", currentDeleteOrder.value);
    }
    deleteDialogVisible.value = false;
    currentDeleteOrder.value = null;
  }
};

// 处理批量删除
const handleBatchDelete = () => {
  if (multipleSelection.value.length > 0) {
    batchDeleteDialogVisible.value = true;
  }
};

// 确认批量删除
const confirmBatchDelete = () => {
  if (multipleSelection.value.length > 0) {
    // 这里可以添加实际的批量删除API调用
    // 模拟批量删除操作
    const idsToDelete = multipleSelection.value.map((item) => item.id);
    const newOrderData = orderData.filter(
      (item) => !idsToDelete.includes(item.id)
    );
    orderData.length = 0;
    orderData.push(...newOrderData);
    console.log("批量删除订单数:", multipleSelection.value.length);
    multipleSelection.value = [];
    batchDeleteDialogVisible.value = false;
  }
};

// 模拟获取订单数据
const orderData = [
  { id: 1,
    orderNo: "ORD-20230701-0001",
    customerName: "张三",
    orderAmount: 199.00,
    orderStatus: 1,
    createTime: "2023-07-01 10:30:00",
    paymentTime: "2023-07-01 10:35:00"
  },
  {
    id: 2,
    orderNo: "ORD-20230701-0002",
    customerName: "李四",
    orderAmount: 299.00,
    orderStatus: 1,
    createTime: new Date(Date.now() - 60000).toLocaleString(),
    paymentTime: new Date(Date.now() - 55000).toLocaleString()
  },
  {
    id: 3,
    orderNo: "ORD-20230701-0003",
    customerName: "王五",
    orderAmount: 399.00,
    orderStatus: 1,
    createTime: new Date(Date.now() - 120000).toLocaleString(),
    paymentTime: new Date(Date.now() - 115000).toLocaleString()
  },
  {
    id: 4,
    orderNo: "ORD-20230701-0004",
    customerName: "赵六",
    orderAmount: 499.00,
    orderStatus: 1,
    createTime: new Date(Date.now() - 180000).toLocaleString(),
    paymentTime: new Date(Date.now() - 175000).toLocaleString()
  },
  {
    id: 5,
    orderNo: "ORD-20230701-0005",
    customerName: "钱七",
    orderAmount: 599.00,
    orderStatus: 1,
    createTime: new Date(Date.now() - 240000).toLocaleString(),
    paymentTime: new Date(Date.now() - 235000).toLocaleString()
  },
];

// 统计图表
const chartViewsRef = ref(null);
const chartViews = ref(null);

// 订单每天数量
const chartOptions = ref({
  title: {
    text: "订单每天数量",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}单",
  },

  xAxis: {
    type: "category",
    name: "日期",
    data: [
      "7月1日",
      "7月2日",
      "7月3日",
      "7月4日",
      "7月5日",
      "7月6日",
      "7月7日",
      "7月8日",
      "7月9日",
      "7月10日",
      "7月11日",
      "7月12日",
      "7月13日",
      "7月14日",
      "7月15日",
      "7月16日",
      "7月17日",
      "7月18日",
      "7月19日",
      "7月20日",
      "7月21日",
      "7月22日",
      "7月23日",
      "7月24日",
    ],
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
      data: [
        100, 200, 150, 300, 250, 350, 400, 300, 200, 150, 100, 200, 150, 300,
        250, 350, 400, 300, 200, 150, 100, 200, 150, 300,
      ],
    },
  ],
});

const handleEdit = (index, row) => {
  // activeName.value = 'child'
  router.push({
    path: "/admin/orderManage/orderEdit",
    query: {
      id: row.id,
    },
  });
};

// 添加订单
const addOrder = () => {
  router.push({
    path: "/admin/orderManage/orderAdd",
  });
};

// 搜索订单
const searchOrder = () => {
  if (orderNo.value) {
    // 这里可以添加实际的搜索API调用
    // 模拟搜索操作
    const filtered = orderData.filter(item => item.orderNo.includes(orderNo.value));
    console.log("搜索结果:", filtered);
  } else {
    console.log("请输入订单号");
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
