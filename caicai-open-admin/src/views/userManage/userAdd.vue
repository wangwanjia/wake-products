
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">添加用户</h3>
    <el-form ref="editForm" :model="userInfo" :rules="rules" label-width="120px">
      <el-form-item label="论坛URL" prop="forumUrl" required>
        <el-input v-model="userInfo.forumUrl"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="userInfo.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" required>
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" required>
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="到期时间" prop="expireTime" required>
        <el-date-picker v-model="userInfo.expireTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">添加</el-button>
        <el-button class="bg-gray-300! border-0! text-gray-600! " @click="cancelAdd">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { registerUser } from '@/api/user';

const router = useRouter();
const route = useRoute();
const editForm = ref(null);

// 用户信息数据
const userInfo = ref({
  username: '',
  password: '',
  email: 'caicai@qq.com',
  phone: '18888888888',
  forumUrl: 'caicai.com',
  expireTime: new Date(),
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
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: false, message: '请输入有效的邮箱格式', trigger: 'blur', type: 'email' }
  ],
  phone: [
    { required: false, pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号格式', trigger: 'blur' }
  ],
  expireTime: [
    { required: true, message: '到期时间不能为空', trigger: 'change' },
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


// 保存用户信息
const addUser = async () => {
  try {
    // 表单验证
    await editForm.value.validate();
    
    // 调用API添加用户
    const res = await registerUser(userInfo.value);
    
    if (res.success) {
      ElMessage.success('用户添加成功');
      // 返回用户管理页面
      router.push('/userManage');
      // 刷新用户列表
      window.handleGetUsersList();
    } else {
      ElMessage.error(res.data.message || '用户添加失败');
    }
  } catch (error) {
    console.error('添加用户失败:', error);
    // 如果是表单验证错误，不显示错误消息
    if (!error?.name || error.name !== 'ValidateError') {
      ElMessage.error('添加用户失败');
    }
  }
};

// 取消添加
const cancelAdd = () => {
  router.push('/userManage');
};
</script>

<style scoped>
.container-user-edit {
  margin: 20px;
}
</style>


