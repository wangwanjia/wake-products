  <template>
    <div class="container-posts-edit p-4 bg-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">编辑帖子</h3>
      <el-form ref="editForm" :model="postsInfo" label-width="120px">
        <el-form-item label="帖子ID" prop="id">
          <el-input v-model="postsInfo.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="帖子名" prop="postsName">
          <el-input v-model="postsInfo.postsName"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="postsInfo.ip"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="postsInfo.city"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="device">
          <el-input v-model="postsInfo.device"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePosts">保存</el-button>
          <el-button class="bg-gray-300! border-0! text-gray-600!" @click="cancelEdit">取消</el-button>
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

  // 帖子信息数据
  const postsInfo = ref({
    id: '',
    postsName: '',
    ip: '',
    city: '',
    device: ''
  });

  // 模拟获取帖子数据
  const getPostsData = (id) => {
    // 在实际应用中，这里应该是API调用
    const mockPosts = [
      { id: 1, postsName: 'admin', ip: '192.168.1.1', city: '北京', device: '11231' },
      { id: 2, postsName: 'post1', ip: '192.168.1.2', city: '上海', device: '2131231' },
      { id: 3, postsName: 'post2', ip: '192.168.1.3', city: '广州', device: '1244122' }
    ];
    return mockPosts.find(posts => posts.id === Number(id)) || {
      id: '', postsName: '', ip: '', city: '', device: ''
    };
  };

  // 页面加载时获取帖子信息
  onMounted(() => {
    const postsId = route.query.id;
    if (postsId) {
      postsInfo.value = getPostsData(postsId);
    }
  });

  // 保存帖子信息
  const savePosts = () => {
    // 在实际应用中，这里应该是API调用
    console.log('保存帖子信息:', postsInfo.value);
    // 返回帖子管理页面
    router.push('/admin/postsManage');
  };

  // 取消编辑
  const cancelEdit = () => {
    router.push('/admin/postsManage');
  };
  </script>

  <style scoped>
  .container-posts-edit {
    margin: 20px;
  }
  </style>
