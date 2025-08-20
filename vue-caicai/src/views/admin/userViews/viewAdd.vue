
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">添加订单</h3>
    <el-form ref="viewForm" :model="viewInfo" :rules="rules" label-width="120px">
      <el-form-item label="IP" prop="ip">
        <el-input v-model="viewInfo.ip"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="viewInfo.userId"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="viewInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="位置" prop="location">
        <el-input v-model="viewInfo.location"></el-input>
      </el-form-item>
      <el-form-item label="设备" prop="deviceViews">
        <el-radio-group v-model="viewInfo.deviceViews">
          <el-radio label="desktop">电脑</el-radio>
          <el-radio label="mobile">手机</el-radio>
          <el-radio label="tablet">平板</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addView">添加</el-button>
        <el-button class="bg-gray-300! border-0! text-gray-600! " @click="cancelAdd">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { createView } from '@/api/views';

const router = useRouter();
const viewForm = ref(null);

// 订单信息数据
const viewInfo = ref({
  ip:'0.0.0.0',
  userId:0,
  userName:'userName',
  deviceViews:'mobile',
  location:'中国,广西省,桂林市',
});

// 表单验证规则
const rules = ref({
  ip: [
    { required: true, message: '请输入IP', trigger: 'blur' }
  ],
  userId: [
    { required: true, message: '请输入用户ID', trigger: 'blur' }
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 100, message: '用户名长度在 3 到 100 个字符', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请输入位置', trigger: 'blur' }
  ],
  deviceViews: [
    { required: true, message: '请选择设备', trigger: 'change' }
  ]
});


// 保存订单信息
const addView = async () => {
  try {
    await viewForm.value.validate();
    const res = await createView(viewInfo.value);
    if (res.success === true) {
      ElMessage.success('添加成功');
    } else {
      ElMessage.error(res.error);
    }
  } catch (error) {
    ElMessage.error("添加失败",error.message);
  }
};

// 取消添加
const cancelAdd = () => {
  router.push('/admin/userViews');
};
</script>

<style scoped>
.container-user-edit {
  margin: 20px;
}
</style>


