
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">添加用户</h3>
    <el-form ref="editForm" :model="userInfo" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">添加</el-button>
        <el-button class="bg-gray-300! border-0! text-gray-600! " @click="cancelAdd">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { registerUser } from '@/api/user';

const router = useRouter();
const editForm = ref(null);

// 用户信息数据
const userInfo = ref({
  username: '',
  password: '',
});

// 表单验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 100, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
  ]
});


// 保存用户信息
const addUser = async () => {
  try {
    await editForm.value.validate();
    const res = await registerUser(userInfo.value);
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
  router.push('/admin/userManage');
};
</script>

<style scoped>
.container-user-edit {
  margin: 20px;
}
</style>


