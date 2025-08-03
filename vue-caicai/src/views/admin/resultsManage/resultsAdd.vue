<template>
  <div class="container-results-add p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">添加结果</h3>
    <el-form
      ref="addForm"
      :model="resultsInfo"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="开奖时间" prop="openTime">
        <el-date-picker
          v-model="resultsInfo.openTime"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="期号" prop="expect">
        <el-input v-model="resultsInfo.expect" placeholder="请输入期号1-366"></el-input>
      </el-form-item>
      <el-form-item label="开奖结果" prop="openCode">
        <el-input
          v-model="resultsInfo.openCode"
          placeholder="多个号码用逗号分隔:1,2,3,4,5,6,7"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addResults">添加</el-button>
        <el-button
          class="bg-gray-300! border-0! text-gray-600!"
          @click="cancelAdd"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { addOpenCode } from "@/api/openCode";
import { ElMessage } from "element-plus";
import { getCodeObjByNumbers  } from "@/utils/result";

const router = useRouter();
const addForm = ref(null);
const loading = ref(false);

// 表单验证规则
const rules = reactive({
  openTime: [{ required: true, message: "请选择开奖时间", trigger: "blur" }],
  expect: [
    { required: true, message: "请输入期号", trigger: "blur" },
    { pattern: /^\d+$/, message: "期号必须为数字", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        const num = Number(value);
        if (isNaN(num)) {
          callback(new Error("期号必须为数字"));
          return;
        }
        if (num < 1 || num > 368) {
          callback(new Error("期号必须在1到368之间"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  openCode: [
    { required: true, message: "请输入开奖结果", trigger: "blur" },
    {
      pattern: /^\d+(,\d+)*$/,
      message: "开奖结果格式不正确，请使用逗号分隔多个号码",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        // 验证是否为空
        if (!value) {
          callback(new Error("开奖结果不能为空"));
          return;
        }
        const numbers = value.split(",");
        // 验证是否为7个号码
        if (numbers.length !== 7) {
          callback(new Error("开奖结果必须为7个号码"));
          return;
        }
        // 验证每个号码是否在1到49之间
        if (
          numbers.some((num) => {
            const numInt = parseInt(num, 10);
            return isNaN(numInt) || numInt < 1 || numInt > 49;
          })
        ) {
          callback(new Error("开奖结果必须在1到49之间且为有效数字"));
          return;
        }
        callback();
      },
      trigger: "blur",
    },
  ],
});

// 结果信息数据
const resultsInfo = ref({
  openTime: "",
  expect: "",
  openCode: "",
});

// 添加结果信息
const addResults = async () => {
  // 表单验证
  try {
    await addForm.value.validate();
    loading.value = true;

    // 格式化日期为字符串
    const data = {
        expect: resultsInfo.value.expect,
        openTime: resultsInfo.value.openTime ? new Date(resultsInfo.value.openTime).toISOString() : '',
        openCode: resultsInfo.value.openCode.split(','),
      };
      // 修改生肖和五行
      data.wave = [];
      data.zodiac = [];
      const codeObj = getCodeObjByNumbers(data.openCode);
      codeObj.forEach(item => {
        data.wave.push(item.bose);
        data.zodiac.push(item.sx);
      })

    await addOpenCode(data);
    ElMessage.success("添加成功");
    // 返回结果管理页面
    router.push("/admin/resultsManage");
  } catch (error) {
    console.error("添加失败:", error);
    ElMessage.error("添加失败，请重试");
  } finally {
    loading.value = false;
  }
};

// 取消添加
const cancelAdd = () => {
  router.push("/admin/resultsManage");
};
</script>

<style scoped>
.container-results-add {
  margin: 20px;
}
.el-button--primary {
  background-color: var(--primary);
  border-color: var(--primary);
}
</style>
