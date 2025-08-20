
<template>
  <div class="container-user-edit p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">添加订单</h3>
    <el-form ref="orderForm" :model="orderInfo" :rules="rules" label-width="120px">
      <el-form-item label="帖子ID" prop="postId">
        <el-input v-model="orderInfo.postId"></el-input>
      </el-form-item>
      <el-form-item label="帖子标题" prop="postTitle">
        <el-input v-model="orderInfo.postTitle"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="orderInfo.userId"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="orderInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model="orderInfo.amount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrder">添加</el-button>
        <el-button class="bg-gray-300! border-0! text-gray-600! " @click="cancelAdd">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { createOrder } from '@/api/order';

const router = useRouter();
const orderForm = ref(null);

// 订单信息数据
const orderInfo = ref({
  status: 'cancelled',
  postId: '',
  postTitle: '',
  userId: '',
  userName: '',
  amount: '',
});

// 表单验证规则
const rules = ref({
  postId: [
    { required: true, message: '请输入帖子ID', trigger: 'blur' }
  ],
  postTitle: [
    { required: true, message: '请输入帖子标题', trigger: 'blur' },
    { min: 1, message: '帖子标题长度在 1 到 200 个字符', trigger: 'blur' }
  ],
  userId: [
    { required: true, message: '请输入用户ID', trigger: 'blur' }
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 100, message: '用户名长度在 3 到 100 个字符', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: '请输入金额', trigger: 'blur' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入有效的金额', trigger: 'blur' }
  ]
});


// 保存订单信息
const addOrder = async () => {
  try {
    await orderForm.value.validate();
    const res = await createOrder(orderInfo.value);
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
  router.push('/admin/orderManage');
};
</script>

<style scoped>
.container-user-edit {
  margin: 20px;
}
</style>


