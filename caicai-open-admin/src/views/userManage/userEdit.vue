
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">编辑用户</h3>
    <el-form ref="editForm" :model="userInfo" :rules="rules" label-width="120px">
      <el-form-item label="UUID" prop="uuid">
        <el-input v-model="userInfo.uuid" disabled></el-input>
      </el-form-item>
      <el-form-item label="论坛URL" prop="forumUrl" required>
        <el-input v-model="userInfo.forumUrl"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" required>
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" required>
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="过期时间" prop="expireTime">
        <el-date-picker v-model="userInfo.expireTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser">保存</el-button>
        <el-button class="bg-gray-300! border-0! text-gray-600!" @click="cancelEdit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { updateUser } from '@/api/user';

const router = useRouter();
const route = useRoute();
const editForm = ref(null);

// 用户信息数据
const userInfo = ref({
  forumUrl: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  expireTime: new Date()
});

// 表单验证规则
const rules = {
  forumUrl: [
    { required: true, message: '论坛URL不能为空', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: false, message: '密码不能为空', trigger: 'blur' },


  ],
  email: [
    { required: false, message: '', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: false, message: '', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号格式', trigger: 'blur' }
  ],
  expireTime: [
    {
      validator: (rule, value, callback) => {
        if (value && new Date(value) <= new Date()) {
          callback(new Error('到期时间必须晚于当前时间'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
};



// 页面加载时获取用户信息
onMounted(() => {
  const user = route.query.user;
  if (user) {
    userInfo.value = JSON.parse(user);
  }
});

// 保存用户信息
const saveUser = async () => {
  try {
    // 表单验证
    await editForm.value.validate();
    
    // 调用API更新用户
    const res = await updateUser(userInfo.value.id, userInfo.value);
    
    if (res.success) {
      ElMessage.success('用户更新成功');
      // 返回用户管理页面
      router.push('/userManage');
      window.handleGetUsersList();
    } else {
      ElMessage.error(res.data.message || '用户更新失败');
    }
  } catch (error) {
    console.error('更新用户失败:', error);
    // 如果是表单验证错误，不显示错误消息
    if (!error?.name || error.name !== 'ValidateError') {
      ElMessage.error('更新用户失败');
    }
  }
};

// 取消编辑
const cancelEdit = () => {
  router.push('/userManage');
};
</script>

<style scoped>
.container-user-edit {
  margin: 20px;
}
</style>


