<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane name="index">
      <!-- 用户访问记录自动刷新列表实时查看用户信息 -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
        <!-- 删除确认对话框 -->
        <el-dialog v-model="deleteDialogVisible" title="确认删除" width="30%">
          <div>
            确定要删除用户
            <span class="font-semibold text-red-500">{{
              currentDeleteUser?.account || ""
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
            个用户吗？
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
        <!-- 快速充值对话框 -->
        <el-dialog
          v-model="rechargeDialogVisible"
          title="快速充值"
          width="30%"
        >
          <div class="space-y-4">
            <div>
              确定要为用户
              <span class="font-semibold text-red-500">{{rechargeUser.account}}</span>
              充值吗？
            </div>
            <el-input
              v-model="rechargeAmount"
              placeholder="请输入充值金额"
              type="number"
              min="1"
              style="width: 100%"
            ></el-input>
          </div>
          <template #footer>
            <div class="flex justify-end gap-2">
              <el-button
                type="primary"
                @click="rechargeDialogVisible = false"
                >取消</el-button
              >
              <el-button
                class="bg-(--el-color-danger)! border-0!"
                type="danger"
                @click="confirmRecharge"
                >确认充值</el-button
              >
            </div>
          </template>
        </el-dialog>

        <!-- 内容 -->
        <h3 class="text-lg font-semibold mb-4 text-gray-800">用户管理</h3>
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
            <el-button type="primary" class="ml-2" @click="addUser"
              >添加用户</el-button
            >
          </div>
        </div>
        <div class="overflow-x-auto">
          <el-table
            ref="multipleTableRef"
            :data="userData"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              :selectable="selectable"
              width="38"
            />
            <el-table-column prop="createdAt" label="注册时间" width="180" >
              <template #default="scope">
                {{formatDate(new Date(scope.row.createdAt), 'yyyy-MM-dd HH:mm:ss') }}


              </template>
            </el-table-column>
            <el-table-column prop="ip" label="IP" width="100" />
            <el-table-column prop="account" label="账号" />
            <el-table-column prop="gold" label="金币" />
            <el-table-column prop="historyGold" label="历史金币" />
            <el-table-column prop="purchasedPostIds" label="购买的帖子ID" width="180" />
            <el-table-column prop="level" label="等级" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="avatar" label="头像" />
            <el-table-column label="操作" width="180" fixed="right">

              <template #default="scope">
                <div class="flex justify-center items-center px-2!">
                  <el-button
                    class="text-white! border-0!"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    class="text-white! border-0!"
                    size="small"
                    @click="handleRecharge(scope.$index, scope.row)"
                  >
                    充值
                  </el-button>
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
import { getUsers,searchUserName,updateUser,batchDeleteUsers } from "@/api/user";
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
    if (newVal === "/admin/userManage") {
      activeName.value = "index";
      getUserData();
      getUserDataChart();
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
const currentDeleteUser = ref(null);

// 批量删除对话框相关变量
const batchDeleteDialogVisible = ref(false);

// 用户访问记录相关变量
const loading = ref(false);
const userId = ref("");

// 处理删除操作
const handleDelete = (user) => {
  currentDeleteUser.value = user;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = async () => {
  if (currentDeleteUser.value) {
    try {
      const res = await batchDeleteUsers([currentDeleteUser.value.id]);
      if (res.success) {
        ElMessage.success('删除成功');
        getUserData();
      } else {
        ElMessage.error('删除失败');
      }
    } catch (error) {
      ElMessage.error('删除失败', error.message);
    }finally{
      deleteDialogVisible.value = false;
      currentDeleteUser.value = null;
    }
  }
};

// 处理批量删除
const handleBatchDelete = () => {
  if (multipleSelection.value.length > 0) {
    batchDeleteDialogVisible.value = true;
  }else{
    ElMessage.warning('请选择要删除的用户');
  }
};

// 确认批量删除
const confirmBatchDelete = async () => {
  try {
    const res = await batchDeleteUsers(multipleSelection.value.map((item) => item.id));
    if (res.success) {
      ElMessage.success('删除成功');
      getUserData();
    } else {
      ElMessage.error('删除失败');
    }
  } catch (error) {
    ElMessage.error('删除失败', error.message);
  }finally{
    batchDeleteDialogVisible.value = false;
  }
};

// 用户数据
const userData = ref([]);
// 获取用户数据
const getUserData = async () => {
  loading.value = true;
  try {
    const res = await getUsers({
      page: page.value,
      pageSize: pageSize.value,
    });
    if (res.success) {
      userData.value = res.data;
      total.value = res.total;
    }
  } catch (error) {
    ElMessage.error('获取用户数据失败',error.message);
  } finally {
    loading.value = false;
  }
};
getUserData();

// 用户名查询
const searchName = ref('');
const handleSearch = async () => {
  if (searchName.value) {
    // 清空分页数据
    page.value = 1;
    total.value = 0;
  
      // 执行查询
      const res = await searchUserName(searchName.value);
      if (res.success) {
        userData.value = res.data;
        total.value = res.total;
      }
    }else{
      getUserData();
    }
}

// 充值
const rechargeDialogVisible = ref(false);
const rechargeUser = ref({});
const rechargeAmount = ref(0);

const handleRecharge = (index,user) => {
  rechargeUser.value = user;
  rechargeDialogVisible.value = true;
}
const confirmRecharge = async () => {
  if (rechargeUser.value && rechargeAmount.value) {
    try {
      const res = await updateUser(rechargeUser.value.id,{
        gold: rechargeAmount.value,
      });
      if (res.success) {
        ElMessage.success('充值成功');
        getUserData();
      } else {
        ElMessage.error('充值失败');
      }
    } catch (error) {
      ElMessage.error('充值失败', error.message);
    }finally{
      rechargeDialogVisible.value = false;
    }
  }
}



// 统计图表
const chartViewsRef = ref(null);
const chartViews = ref(null);
const userDateArr = ref([]);
const userDateNum = ref([]);

const getUserDataChart = async () => {
  try {
   
    const res = await getUsers({
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
      userDateArr.value = [...new Set(recentDates)].sort();
      // 统计每个日期的注册用户数量
      userDateNum.value = userDateArr.value.map(date => recentDates.filter(d => d === date).length);
        // 更新图表选项
      chartOptions.value.xAxis.data = userDateArr.value;
      chartOptions.value.series[0].data = userDateNum.value;
      if (chartViews.value) {
        chartViews.value.setOption(chartOptions.value);
      }
    }
  } catch (error) {
    ElMessage.error('图表获取用户数据失败',error.message);
  }
};
getUserDataChart();

// 用户每天注册量
const chartOptions = ref({
  title: {
    text: "用户每天注册量",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}个",
  },

  xAxis: {
    type: "category",
    name: "日期",
    data: userDateArr.value,

  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "注册量",
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
      data: userDateNum.value,
    },
  ],
});

const handleEdit = (index, row) => {
  router.push({
    path: "/admin/userManage/userEdit",
    query: {
      user: JSON.stringify(row),
    }
  });
};

// 添加用户
const addUser = () => {
  router.push({
    path: "/admin/userManage/userAdd",
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
