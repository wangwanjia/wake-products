
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">编辑用户</h3>
    <el-form ref="editForm" :model="userInfo" label-width="120px">

      <el-form-item label="用户ID" prop="id">
        <el-input v-model="userInfo.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="account">
        <el-input v-model="userInfo.account"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="userInfo.ip"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
       <el-form-item label="金币" prop="gold">
        <el-input v-model="userInfo.gold"></el-input>
      </el-form-item>
      <el-form-item label="历史金币" prop="historyGold">
        <el-input v-model="userInfo.historyGold"></el-input>
      </el-form-item>
      <el-form-item label="购买帖子" prop="purchasedPostIds">
        <el-input v-model="userInfo.purchasedPostIds"></el-input>
      </el-form-item>
      <el-form-item label="是否是管理员" prop="open">
        <el-input v-model="userInfo.open"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="userInfo.level"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="saveUser">保存</el-button>
        <el-button class="bg-gray-300! border-0! text-gray-600!" @click="cancelEdit">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {updateUser } from '@/api/user';
import {ElMessage} from 'element-plus';


const router = useRouter();
const route = useRoute();
const editForm = ref(null);



// 用户信息数据
const userInfo = ref({
  id: '',
  account: '',
  password: '',
  ip: '',
  email: '',
  phone: '',
  gold: '',
  historyGold: '',
  purchasedPostIds: '',
  open: '',
  level: ''
});

// 页面加载时获取用户信息
onMounted(() => {
  const userStr = route.query.user;
  if (userStr) {
    userInfo.value = JSON.parse(userStr);
  }
});

// 保存用户信息
const saveUser = async () => {
  const res = await updateUser(userInfo.value.id, userInfo.value);
  if (res.success == true) {
    ElMessage.success('修改成功');
  } else {
    ElMessage.error(res.msg);
  }
  // 返回用户管理页面
  router.push('/admin/userManage');
};

// 取消编辑
const cancelEdit = () => {
  router.push('/admin/userManage');
};
</script>

<style scoped>
.container-user-edit {
  margin: 20px;
}
</style>


