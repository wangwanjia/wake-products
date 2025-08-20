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
              currentDeleteUser?.userName || ""
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

        <!-- 内容 -->
        <div class="flex justify-between align-center my-4">
          <div class="">
            <el-input
              placeholder="请输入用户名"
              v-model="searchForm.keyword"
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

            <div class="">
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
            <el-table-column prop="uuid" label="UUID"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="forumUrl" label="论坛" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="手机号" ></el-table-column>
        <el-table-column prop="expireTime" label="过期时间" ></el-table-column>
        <el-table-column prop="createdAt" label="注册时间" ></el-table-column>
            <el-table-column label="操作" width="130">
              <template #default="scope">
                <div class="w-full flex justify-end align-center">
                  <el-button
                  class="text-white! border-0!"
                  size="small"
                  @click="handleEdit(scope.row)"
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
defineOptions({ name: "UserManageIndex" });
import { ref, onMounted, onUnmounted, watch, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import * as echarts from "echarts";
import { getUsers, searchUserByUsername, batchDeleteUsers } from "@/api/user";


const router = useRouter();
const route = useRoute();

const activeName = ref("index");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

watch(
  () => route.path,
  (newVal) => {
    if (newVal === "/userManage") {
      activeName.value = "index";
    } else {
      activeName.value = "child";
    }
  }
);

// 分页变量
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 多选数据 批量处理
const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

// 删除对话框相关变量
const deleteDialogVisible = ref(false);
const currentDeleteUser = ref(null);

// 批量删除对话框相关变量
const batchDeleteDialogVisible = ref(false);

// 搜索相关变量
const loading = ref(false);
const searchForm = ref({
  keyword: ''
});

// 模拟用户数据
const userData = ref([]);
const handleGetUsers = async () => {
  window.handleGetUsersList = handleGetUsers;
  loading.value = true;
  try{
     const res = await getUsers({
      page: page.value,
      pageSize: pageSize.value
    });
    if (res.data.length > 0) {
      // 处理时间格式
      res.data.forEach(item => {
        item.expireTime = new Date(item.expireTime).toLocaleString();
        item.createdAt = new Date(item.createdAt).toLocaleString();
      })
      total.value = res.total;
      userData.value = res.data;
    }
  } catch (error) {
    console.error('获取用户列表失败:', error);
    ElMessage.error('获取用户列表失败');
  } finally {
    loading.value = false;
  }
};


// 搜索功能
const search = () => {
  loading.value = true;
  setTimeout(async () => {
    try {
      if (searchForm.value.keyword === '') {
        handleGetUsers();
        return;
      }
      const res = await searchUserByUsername({
        username: searchForm.value.keyword,
      });
      if (res.data) {
        // 处理时间格式
        res.data.forEach(item => {
          item.expireTime = new Date(item.expireTime).toLocaleString();
          item.createdAt = new Date(item.createdAt).toLocaleString();
        })
        userData.value = res.data;
        total.value = res.data.length;
      } else {
        userData.value = [];
        total.value = 0;
      }
    } catch (error) {
      console.error('搜索用户失败:', error);
      ElMessage.error('搜索用户失败');
    } finally {
      loading.value = false;
    }
  }, 500);
};

// 监听搜索框变化
watch(
  () => searchForm.value.keyword,
  (newVal) => {
    if (newVal === '') {
      handleGetUsers();
    }
  }
)

// 处理删除操作
const handleDelete = (user) => {
  currentDeleteUser.value = user;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = async () => {
  if (currentDeleteUser.value) {
    try {
      await batchDeleteUsers({ ids: [currentDeleteUser.value.id] });

      // 删除成功后更新本地数据
      const index = userData.value.findIndex(
        (item) => item.id === currentDeleteUser.value.id
      );
      if (index !== -1) {
        userData.value.splice(index, 1);
        total.value--;
      }
      ElMessage.success('用户删除成功');
    } catch (error) {
      console.error('删除用户失败:', error);
      ElMessage.error('删除用户失败');
    } finally {
      deleteDialogVisible.value = false;
      currentDeleteUser.value = null;
    }
  }
};

// 处理批量删除
const handleBatchDelete = () => {
  if (multipleSelection.value.length > 0) {
    batchDeleteDialogVisible.value = true;
  }
};

// 确认批量删除
const confirmBatchDelete = async () => {
  if (multipleSelection.value.length > 0) {
    try {
      const idsToDelete = multipleSelection.value.map((item) => item.id);
      await batchDeleteUsers({ ids: idsToDelete });
      // 删除成功后更新本地数据
      const newUserData = userData.value.filter(
        (item) => !idsToDelete.includes(item.id)
      );
      userData.value = newUserData;
      total.value = userData.value.length;
      ElMessage.success(`成功删除${multipleSelection.value.length}个用户`);
    } catch (error) {
      console.error('批量删除用户失败:', error);
      ElMessage.error('批量删除用户失败');
    } finally {
      multipleSelection.value = [];
      batchDeleteDialogVisible.value = false;
    }
  }
};



// 统计图表
const chartViewsRef = ref(null);
const chartViews = ref(null);
const chartDate = ref([]);  // 日期数组
const chartRegister = ref([]);  // 注册量数组

// 获取用户图表数据并按日期统计注册量
const handleGetUsersChart = async () => {
  const res = await getUsers({
    page: 1,
    pageSize: 1000
  });
  if (res.data.length > 0) {
    // 按日期统计注册量
    const registerCountMap = new Map();
    res.data.forEach(item => {
      // 假设每个用户数据里有注册时间字段，这里用 item.registerTime 示例，实际需根据接口返回调整
      const registerDate = new Date(item.createdAt).toLocaleDateString();
      registerCountMap.set(registerDate, (registerCountMap.get(registerDate) || 0) + 1);
    });

    // 清空旧数据
    chartDate.value = [];
    chartRegister.value = [];

    // 将统计结果按日期排序并赋值给响应式变量
    const sortedEntries = Array.from(registerCountMap.entries()).sort((a, b) => {
      return new Date(a[0]) - new Date(b[0]);
    });
    console.log(sortedEntries);
    sortedEntries.forEach(([date, count]) => {
      chartDate.value.push(date);
      chartRegister.value.push(count);
    });

    // 更新图表配置
    chartOptions.value.xAxis.data = chartDate.value;
    chartOptions.value.series[0].data = chartRegister.value;
    if (chartViews.value) {
      chartViews.value.setOption(chartOptions.value);
    }
  }
}



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
    data: chartDate.value,

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
      data: chartRegister.value,

    },
  ],
});

const handleEdit = (user) => {
  router.push({
    path: "/userManage/userEdit",
    query: {
      user: JSON.stringify(user),

    },
  });
};

// 添加用户
const addUser = () => {
  router.push({
    path: "/userManage/userAdd",
  });
};

// 确保初始化代码正确
onMounted(() => {
  handleGetUsers();  //获取用户数据
  handleGetUsersChart();  //获取用户图表数据


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
