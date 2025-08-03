<template>
  <div class="tabs-get-open">
    <!-- 操作按钮 -->
    <div
      class="flex justify-start align-center py-4 border-b-2 border-b-gray-200"
    >
      <el-button
        type="primary"
        class="ml-2"
        :disabled="loading"
        @click="handleGetOpenCodeYear"
        >新澳门 获取开奖数据 近三年</el-button
      >

      <el-button
        type="primary"
        class="ml-2"
        :disabled="loading"
        @click="handleGetOpenCodeNew"
        >新澳门 获取当前最新一期</el-button
      >
    </div>

    <!-- 用户访问记录自动刷新列表实时查看用户信息 -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
      <!-- 删除确认对话框 -->
      <el-dialog v-model="deleteDialogVisible" title="确认删除" width="30%">
        <div>
          确定要删除结果
          <span class="font-semibold text-red-500"
            >{{ currentDeleteResult?.expect || "" }}期</span
          >
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
          个开奖期数吗？
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <el-button type="primary" @click="batchDeleteDialogVisible = false"
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

      <!-- 获取开奖数据 -->
      <!-- <GetOpenCode :topOpenCodeDate="resultDataYear[0]?.openTime" /> -->
      <!-- 搜索 -->
      <div class="flex justify-between align-center my-4">
        <div class="search-box flex items-center">
          <div class="date">
            <el-date-picker
              v-model="dateRange"
              class="w-[400px]!"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="default"
            />
          </div>
          <div class="">
            <el-button
              type="primary"
              class="ml-2"
              :disabled="loading"
              @click="searchResult"
              >查询</el-button
            >
          </div>
        </div>

        <div>
          <el-button type="primary" class="ml-2" @click="addResult"
            >添加结果</el-button
          >
        </div>
      </div>
      <!-- 表格数据内容 -->
      <div class="overflow-x-auto">
        <el-table
          ref="multipleTableRef"
          :data="resultData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="38" />
          <!-- <el-table-column prop="id" label="ID" width="58" /> -->
          <el-table-column prop="openTimeCN" label="开奖时间" width="240" />
          <el-table-column prop="expect" label="期号" width="88">
            <template #default="scope">
              <div class="font-bold text-(--red)">{{ scope.row.expect }}期</div>
            </template>
          </el-table-column>
          <el-table-column prop="codeObjArr" label="开奖结果">
            <template #default="scope">
              <ul class="flex justify-evenly items-center gap-4 py-3">
                <template v-for="(item, index) in scope.row.codeObjArr">
                  <li v-if="index < 6" class="center flex-col justify-center">
                    <div
                      :class="`${item.bose}-code`"
                      class="code center w-[32px] md:h-[32px] text-[14px] md:text-[14px] font-bold text-shadow-md shadow-xl/10"
                    >
                      {{ item.hm }}
                    </div>
                    <div class="sx-wx mt-1 text-sm">
                      <span class="">{{ item.sx }}</span>
                      <span class="text-black/30 mx-0.5">/</span>
                      <span>{{ item.mswux }}</span>
                    </div>
                  </li>

                  <template v-else>
                    <li class="center flex-col">
                      <svg
                        t="1753105802498"
                        class="icon max-md:w-[18px] max-md:h-[18px]"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="14699"
                        width="22"
                        height="22"
                      >
                        <path
                          d="M512.537805 4.093235C232.773837 4.093235 5.172019 231.685734 5.172019 511.439258c0 279.736115 227.601818 507.32759 507.365786 507.32759 279.76704 0 507.368858-227.591475 507.368858-507.32759C1019.90656 231.685734 792.303718 4.093235 512.537805 4.093235zM512.537805 966.843187c-251.129651 0-455.438029-204.298957-455.438029-455.404032 0-251.120333 204.307354-455.422464 455.438029-455.422464 251.130675 0 455.443149 204.299981 455.443149 455.422464C967.979827 762.543206 763.668378 966.843187 512.537805 966.843187zM490.074214 527.631974c-2.18071-14.180966-15.551795-23.882957-29.614694-21.702246l-50.692608 7.808819L409.766912 404.345118l51.927754 0c14.33303 0 25.964339-11.629875 25.964339-25.962291 0-14.33344-11.631411-25.962291-25.964339-25.962291l-51.927754 0 0-86.539982c0-14.334464-11.619123-25.962291-25.962291-25.962291-14.344294 0-25.964339 11.627827-25.964339 25.962291l0 86.539982-34.615774 0 0-51.924603c0-14.33344-11.621171-25.962291-25.964339-25.962291-14.342246 0-25.963315 11.628851-25.963315 25.962291l0 61.676711c0 19.808154-11.89335 31.961907-20.418867 31.961907-14.34327 0-25.964339 11.628851-25.964339 25.962291 0 14.332416 11.621171 25.962291 25.964339 25.962291 26.58048 0 49.602662-16.885555 62.177587-41.715098l44.784784 0 0 117.371174-107.156787 16.496742c-14.174413 2.18071-23.894118 15.431475-21.712384 29.612442 1.968947 12.829184 13.031322 22.00617 25.624678 22.00617 1.310925 0 2.646426-0.101274 3.982848-0.303923l99.263795-15.280026 0 176.258353c0 14.335488 11.620147 25.961267 25.964339 25.961267 14.34327 0 25.962291-11.625779 25.962291-25.961267L409.769138 566.270021l58.605056-9.025536C482.536243 555.063808 492.255027 541.812019 490.074214 527.631974zM755.944141 404.345139 652.091754 404.345139l0-51.924603 86.543528 0c14.334054 0 25.963315-11.629875 25.963315-25.962291 0-14.33344-11.629363-25.962291-25.963315-25.962291l-86.543528 0 0-69.231781c0-14.334464-11.629363-25.962291-25.962291-25.962291-14.335078 0-25.963315 11.626803-25.963315 25.962291l0 69.231781-69.235641 0c-14.335078 0-25.963315 11.628851-25.963315 25.962291 0 14.332416 11.628339 25.962291 25.963315 25.962291l69.235641 0 0 51.924603-86.545574 0c-14.332006 0-25.96137 11.628851-25.96137 25.961267 0 14.33344 11.629363 25.963315 25.96137 25.963315l242.32372 0c14.335078 0 25.963315-11.629875 25.963315-25.963315C781.907558 415.97399 770.278195 404.345139 755.944141 404.345139zM755.944141 525.501542l-51.924684 0 0-34.616402c0-14.33344-11.629363-25.962291-25.964339-25.962291-14.33303 0-25.962291 11.628851-25.962291 25.962291l0 34.616402L513.619448 525.501542c-14.332006 0-25.96137 11.628851-25.96137 25.963315 0 14.332416 11.629363 25.961267 25.96137 25.961267l138.471282 0 0 123.607202c0 23.343616 0 33.01079-48.006246 33.01079-14.33303 0-25.960346 11.630899-25.960346 25.962291 0 14.334464 11.627315 25.963315 25.960346 25.963315 29.903258 0 99.932979 0 99.932979-84.936499L704.017463 577.427128l51.924684 0c14.335078 0 25.963315-11.628851 25.963315-25.961267C781.907558 537.131418 770.278195 525.501542 755.944141 525.501542zM539.583795 603.38944c-14.33303 0-25.964339 11.628851-25.964339 25.961267l0 51.924603c0 14.334464 11.631411 25.963315 25.964339 25.963315 14.335078 0 25.963315-11.628851 25.963315-25.963315l0-51.924603C565.547213 615.018291 553.918874 603.38944 539.583795 603.38944z"
                          p-id="14700"
                          fill="#039e6d"
                        ></path>
                      </svg>
                    </li>
                    <li class="center flex-col">
                      <div
                        :class="`${item.bose}-code`"
                        class="code red-code center w-[32px] h-[32px] text-[14px] font-bold text-shadow-md shadow-xl/10"
                      >
                        {{ item.hm }}
                      </div>
                      <div class="sx-wx mt-1 text-sm">
                        <span class="">{{ item.sx }}</span>
                        <span class="text-black/30 mx-0.5">/</span>
                        <span>{{ item.mswux }}</span>
                      </div>
                    </li>
                  </template>
                </template>
              </ul>
            </template>
          </el-table-column>
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
            @current-change="handleCurrentChange"
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
            type="primary"
            class="bg-(--el-color-danger)! border-0!"
            @click="addResult"
            >清空开奖表</el-button
          >
        </div>
      </div>
    </div>

    <!-- 统计图表 -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div ref="chartMacaoRef" class="w-full! h-[400px]"></div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "GetOpenCodeMacao" });
import { ref, onMounted, nextTick, watch, onActivated } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as echarts from "echarts";
import { sxArr, codeArr, getCodeObjByNumbers } from "@/utils/result";
import { formatDate } from "@/utils/index";

// 请求
import {
  getOpenCodeList,
  getOpenCodeByDate,
  deleteOpenCode,
  batchDeleteOpenCode,
} from "@/api/openCode";
import { ElMessage } from "element-plus";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const route = useRoute();

// 用到的数据变量
const loading = ref(false); //加载状态
const dateRange = ref(null); //查询时间范围
const resultData = ref([]); //查询结果数据

// 分页变量
const page = ref(1); //当前页码
const pageSize = ref(10); //每页条数
const total = ref(0); //总条数
const handleCurrentChange = (val) => {
  page.value = val;
  handleGetOpenCodeList();
};

// 打开码列表
const handleGetOpenCodeList = async (params) => {
  loading.value = true;
  try {
    let res = [];
    if (params && params.startDate && params.endDate) {
      //搜索对象值
      res = await getOpenCodeByDate(params);
    } else {
      //搜索全部
      res = await getOpenCodeList({
        page: page.value,
        pageSize: pageSize.value,
      });
    }
    resultData.value = handleData(res.data);
    total.value = res.total;
  } catch (error) {
    console.error("获取打开码列表失败:", error);
  } finally {
    loading.value = false;
  }
};
handleGetOpenCodeList();

// 数据字段处理
const handleData = (data) => {
  data.forEach((item) => {
    item.openTimeCN = formatDate(new Date(item.openTime));
    item.codeObjArr = getCodeObjByNumbers(item.openCode);
  });
  return data;
};

// 查询
const searchResult = () => {
  // 修改页码为第一页
  page.value = 1;
  let params = {};
  if (dateRange.value) {
    params.startDate = formatDate(
      new Date(dateRange.value[0]),
      "yyyy-MM-dd HH:mm:ss"
    );
    params.endDate = formatDate(
      new Date(dateRange.value[1]),
      "yyyy-MM-dd HH:mm:ss"
    );
  }
  handleGetOpenCodeList(params);
};

// 多选数据 批量处理
const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

// 删除对话框相关变量
const deleteDialogVisible = ref(false); //删除对话框是否显示
const currentDeleteResult = ref(null); //当前删除的结果数据
// 批量删除对话框相关变量
const batchDeleteDialogVisible = ref(false);

// 处理删除操作
const handleDelete = (result) => {
  currentDeleteResult.value = result;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = async () => {
  if (currentDeleteResult.value) {
    loading.value = true;
    try {
      await deleteOpenCode(currentDeleteResult.value.id);
      ElMessage.success("删除成功");
      // 重新获取数据列表
      handleGetOpenCodeList();
    } catch (error) {
      console.error("删除失败:", error);
      ElMessage.error("删除失败，请重试");
    } finally {
      loading.value = false;
      deleteDialogVisible.value = false;
      currentDeleteResult.value = null;
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
    loading.value = true;
    try {
      const idsToDelete = multipleSelection.value.map((item) => item.id);
      await batchDeleteOpenCode(idsToDelete);
      ElMessage.success(`成功删除${multipleSelection.value.length}条数据`);
      // 重新获取数据列表
      handleGetOpenCodeList();
      multipleSelection.value = [];
    } catch (error) {
      console.error("批量删除失败:", error);
      ElMessage.error("批量删除失败，请重试");
    } finally {
      loading.value = false;
      batchDeleteDialogVisible.value = false;
    }
  }
};

// 统计图表 按照年份展示
const chartMacaoRef = ref(null);
const chartMacao = ref(null);
const chartData = ref(Object.fromEntries(sxArr.map((item) => [item.sx, 1])));
// 获取当前的年份
const currentYear = new Date().getFullYear();
const resultDataYear = ref([]);

// 添加获取到的数据
const addChartDataPL = async () => {
  try {
    let params = {
      startDate: `${currentYear}-01-01 00:00:00`,
      endDate: `${currentYear}-12-31 23:59:59`,
    };
    let res = await getOpenCodeByDate(params);
    resultDataYear.value = res.data;
    resultDataYear.value.forEach((item) => {
      // 检查 item.zodiac 是否存在
      if (item.zodiac && item.zodiac.length > 6) {
        let sx = item.zodiac[6];
        // 检查生肖是否在 chartData 中
        if (chartData.value[sx] !== undefined) {
          chartData.value[sx] += 1;
        }
      }
    });
  } catch (error) {
    console.error("获取年份开奖数据失败:", error);
  }
};
addChartDataPL();

// 因为 chartOptions 依赖 chartData，使用 watch 监听 chartData 的变化并更新图表选项
const chartOptions = ref({
  title: {
    text: `${currentYear}年十二生肖开奖频率`,
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}个",
  },

  xAxis: {
    type: "category",
    name: "生肖",
    data: Object.keys(chartData.value),
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      // 修正系列名称，从 "注册量" 改为 "开奖频率"
      name: "开奖频率",
      type: "bar",
      itemStyle: {
        color: "#039e6d",
      },
      data: Object.values(chartData.value),
    },
  ],
});

// 监听 chartData 的变化，更新图表选项
watch(
  chartData,
  () => {
    chartOptions.value.xAxis.data = Object.keys(chartData.value);
    chartOptions.value.series[0].data = Object.values(chartData.value);
    if (chartMacao.value) {
      chartMacao.value.setOption(chartOptions.value);
    }
  },
  { deep: true }
);

// 编辑数据
const handleEdit = (index, row) => {
  const { codeObjArr, ...filteredRow } = row;
  router.push({
    path: "/resultsManage/resultsEdit",
    query: filteredRow,
  });
};

// 添加结果
const addResult = () => {
  router.push({
    path: "/resultsManage/resultsAdd",
  });
};

// 确保初始化代码正确
// 将图表初始化逻辑从 onActivated 移至 onMounted，确保组件挂载时就初始化图表
onMounted(() => {
  console.log("chartMacaoRef.value", chartMacaoRef.value);

  chartMacao.value = echarts.init(chartMacaoRef.value);
  chartMacao.value.setOption(chartOptions.value);

  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener("resize", () => {
    chartMacao.value.resize();
  });
});

// 监听isActive
watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        console.log("chartMacao.value2222", chartMacao.value);

        chartMacao.value = echarts.init(chartMacaoRef.value);
        chartMacao.value.setOption(chartOptions.value);
        chartMacao.value.resize();
      });
    }
  }
);
</script>

<style scoped></style>
