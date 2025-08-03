  <template>
    <div class="container-order-edit p-4 bg-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">添加订单</h3>
      <el-form ref="editForm" :model="orderInfo" label-width="120px">
        <el-form-item label="订单ID" prop="id">
          <el-input v-model="orderInfo.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单名称" prop="orderName">
          <el-input v-model="orderInfo.orderName"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="orderInfo.ip"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="orderInfo.city"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="device">
          <el-input v-model="orderInfo.device"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrder">添加</el-button>
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

  // 订单信息数据
  const orderInfo = ref({
    id: '',
    orderName: '',
    ip: '',
    city: '',
    device: ''
  });

  // 模拟获取订单数据
  const getOrderData = (id) => {
    // 在实际应用中，这里应该是API调用
    const mockOrders = [
      { id: 1, orderName: 'admin', ip: '192.168.1.1', city: '北京', device: '11231' },
      { id: 2, orderName: 'order1', ip: '192.168.1.2', city: '上海', device: '2131231' },
      { id: 3, orderName: 'order2', ip: '192.168.1.3', city: '广州', device: '1244122' }
    ];
    return mockOrders.find(order => order.id === Number(id)) || {
      id: '', orderName: '', ip: '', city: '', device: ''
    };
  };

  // 页面加载时获取订单信息
  onMounted(() => {
    const orderId = route.query.id;
    if (orderId) {
      orderInfo.value = getOrderData(orderId);
    }
  });

  // 保存订单信息
  const addOrder = () => {
    // 在实际应用中，这里应该是API调用
    console.log('保存订单信息:', orderInfo.value);
    // 返回订单管理页面
    router.push('/admin/orderManage');
  };

  // 取消添加
  const cancelAdd = () => {
    router.push('/admin/orderManage');
  };
  </script>

  <style scoped>
  .container-order-edit {
    margin: 20px;
  }
  </style>
