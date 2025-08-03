  <template>
    <div class="container-posts-edit p-4 bg-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">添加帖子</h3>
      <el-form ref="editForm" :model="postInfo" label-width="120px">
        <el-form-item label="帖子ID" prop="id">
          <el-input v-model="postInfo.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="帖子名" prop="postName">
          <el-input v-model="postInfo.postName"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="postInfo.ip"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="postInfo.city"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="device">
          <el-input v-model="postInfo.device"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPost">添加</el-button>
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

  // 帖子信息数据
  const postInfo = ref({
    id: '',
    postName: '',
    ip: '',
    city: '',
    device: ''
  });

  // 模拟获取帖子数据
  const getPostData = (id) => {
    // 在实际应用中，这里应该是API调用
    const mockPosts = [
      { id: 1, postName: 'admin', ip: '192.168.1.1', city: '北京', device: '11231' },
      { id: 2, postName: 'post1', ip: '192.168.1.2', city: '上海', device: '2131231' },
      { id: 3, postName: 'post2', ip: '192.168.1.3', city: '广州', device: '1244122' }
    ];
    return mockPosts.find(post => post.id === Number(id)) || {
      id: '', postName: '', ip: '', city: '', device: ''
    };
  };

  // 页面加载时获取帖子信息
  onMounted(() => {
    const postId = route.query.id;
    if (postId) {
      postInfo.value = getPostData(postId);
    }
  });

  // 保存帖子信息
  const addPost = () => {
    // 在实际应用中，这里应该是API调用
    console.log('保存帖子信息:', postInfo.value);
    // 返回帖子管理页面
    router.push('/admin/postsManage');
  };

  // 取消添加
  const cancelAdd = () => {
    router.push('/admin/postsManage');
  };
  </script>

  <style scoped>
  .container-posts-edit {
    margin: 20px;
  }
  </style>
