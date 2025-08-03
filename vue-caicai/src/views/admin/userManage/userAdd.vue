
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">添加用户</h3>
    <el-form ref="editForm" :model="userInfo" label-width="120px">
      <el-form-item label="用户ID" prop="id">
        <el-input v-model="userInfo.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="userInfo.ip"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="userInfo.city"></el-input>
      </el-form-item>
      <el-form-item label="设备" prop="device">
        <el-input v-model="userInfo.device"></el-input>
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
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const editForm = ref(null);

// 用户信息数据
const userInfo = ref({
  id: '',
  userName: '',
  ip: '',
  city: '',
  device: ''
});

// 模拟获取用户数据
const getUserData = (id) => {
  // 在实际应用中，这里应该是API调用
  const mockUsers = [
    { id: 1, userName: 'admin', ip: '192.168.1.1', city: '北京', device: '11231' },
    { id: 2, userName: 'user1', ip: '192.168.1.2', city: '上海', device: '2131231' },
    { id: 3, userName: 'user2', ip: '192.168.1.3', city: '广州', device: '1244122' }
  ];
  return mockUsers.find(user => user.id === Number(id)) || {
    id: '', userName: '', ip: '', city: '', device: ''
  };
};

// 页面加载时获取用户信息
onMounted(() => {
  const userId = route.query.id;
  if (userId) {
    userInfo.value = getUserData(userId);
  }
});

// 保存用户信息
const addUser = () => {
  // 在实际应用中，这里应该是API调用
  console.log('保存用户信息:', userInfo.value);
  // 返回用户管理页面
  router.push('/admin/userManage');
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


