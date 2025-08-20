<template>
    <div class="container-results-edit p-4 bg-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">编辑结果</h3>
      <el-form ref="editForm" :model="resultsInfo" :rules="rules" label-width="120px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="resultsInfo.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="开奖时间" prop="openTime">
          <el-date-picker
            v-model="resultsInfo.openTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="期号" prop="expect">
          <el-input v-model="resultsInfo.expect"></el-input>
        </el-form-item>
        <el-form-item label="开奖结果" prop="openCode">
          <el-checkbox-group
          v-model="resultsInfo.openCode"
          :min="0"
          :max="7"
          @change="handleChange"
          class="m-[10px] grid grid-cols-12 gap-x-[20px] gap-y-[10px]"
        >
          <el-checkbox
            v-for="item in codeArr"
            :key="item.id"
            :label="item.id"
            :value="item.hm"
          >
            <div class="center flex-col">
              <div
                :class="`${item.bose}-code`"
                class="code red-code center w-[24px] h-[24px] text-[12px] font-bold text-shadow-md shadow-xl/10"
              >
                {{ item.hm }}
              </div>
              <div class="sx-wx mt-1 text-xs">
                <span class="">{{ item.sx }}</span>
                <span class="text-black/30 mx-0.5">/</span>
                <span>{{ item.mswux }}</span>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveResults">保存</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button class="bg-gray-300! border-0! text-gray-600!" @click="cancelEdit">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { editOpenCode } from '@/api/openCode';
  import { ElMessage } from 'element-plus';
  import { codeArr,getCodeObjByNumbers  } from "@/utils/result";

  const router = useRouter();
  const route = useRoute();
  const editForm = ref(null);
  const loading = ref(false);

  // 表单验证规则
  const rules = reactive({
    openTime: [
      { required: true, message: '请选择开奖时间', trigger: 'blur' }
    ],
    expect: [
      { required: true, message: '请输入期号', trigger: 'blur' },
      { pattern: /^\d+$/, message: '期号必须为数字', trigger: 'blur' },
      { validator: (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        const num = Number(value);
        if (isNaN(num)) {
          callback(new Error('期号必须为数字'));
          return;
        }
        if (num < 1 || num > 368) {
          callback(new Error('期号必须在1到368之间'));
        } else {
          callback();
        }
      }, trigger: 'blur' }
    ],
    openCode: [
      { required: true, message: '请输入开奖结果', trigger: 'blur' },
      { pattern: /^\d+(,\d+)*$/, message: '开奖结果格式不正确，请使用逗号分隔多个号码', trigger: 'blur' },
      {
      validator: (rule, value, callback) => {
        console.log(value);
        // 验证是否为空
        if (!value) {
          callback(new Error("开奖结果不能为空"));
          return;
        }
        const numbers = value;
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
    ]
  });

  // 结果信息数据
  const resultsInfo = ref({
    id: Number(route.query.id),
    openTime: '',
    expect: '',
    openCode: []
  });

  // 重置表单
  const resetForm = () => {
    editForm.value.resetFields();
  };

  // 页面加载时获取结果信息
  onMounted(() => {
    if (route.query.id) {
      // 从路由参数中获取传递的结果数据
      const resultData = route.query || {};
      
      console.log(resultData);
      if (Object.keys(resultData).length > 0) {
        // 格式化日期时间
        if (resultData.openTime) {
          
          resultData.openTime = new Date(resultData.openTime);
          resultData.openCode = resultData.openCode.map(item => item.toString().padStart(2, '0'));
        }
        
        resultsInfo.value = { ...resultData };
      }
    }
  });


  // 保存结果信息
  const saveResults = async () => {
    // 表单验证
    try {
      await editForm.value.validate();
      loading.value = true;
      // 格式化日期为字符串
      console.log(resultsInfo.value);
      
      const data = {
        expect: resultsInfo.value.expect,
        openTime: resultsInfo.value.openTime ? new Date(resultsInfo.value.openTime).toISOString() : '',
        openCode: resultsInfo.value.openCode,
      };
      // 修改生肖和五行
      data.wave = [];
      data.zodiac = [];
      const codeObj = getCodeObjByNumbers(data.openCode);
      codeObj.forEach(item => {
        data.wave.push(item.bose);
        data.zodiac.push(item.sx);
      })

      await editOpenCode(resultsInfo.value.id, data);
      ElMessage.success('编辑成功');
      // 返回结果管理页面
      router.push('/admin/resultsManage');

      window.handleGetOpenCodeList();
    } catch (error) {
      console.error('编辑失败:', error);
      ElMessage.error('编辑失败，请重试');
    } finally {
      loading.value = false;
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    router.push('/admin/resultsManage');
  };
  </script>

  <style scoped>
  .container-results-edit {
    margin: 20px;
  }
  .el-button--primary {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  :deep(.el-checkbox){
  height: auto;
  margin-bottom: 10px;
}
:deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: var(--primary);
}
  </style>
