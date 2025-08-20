

<template>
  <div class="web-config-container relative">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>网站配置管理</span>
        </div>
      </template>

      <el-form v-if="configData" ref="configForm" :model="configData" label-width="120px">
        <el-form-item label="论坛名称" prop="name">
          <el-input v-model="configData.name" placeholder="请输入论坛名称" />
        </el-form-item>

        <el-form-item label="">
          <div class="upload-images-container">
            <div class="upload-item">
              <div class="upload-label">论坛Logo</div>
              <el-upload
                class="avatar-uploader"
                :action="`${uploadApiBaseUrl}/upload/image`" 
                :show-file-list="false"
                :on-success="handleLogoUploadSuccess"
              >
                <img v-if="configData.logo" :src="configData.logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            
            <div class="upload-item">
              <div class="upload-label">水印图片</div>
              <el-upload
                class="avatar-uploader"
                :action="`${uploadApiBaseUrl}/upload/image`"
                :show-file-list="false"
                :on-success="handleWatermarkUploadSuccess"
              >
                <img v-if="configData.watermarkImage" :src="configData.watermarkImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            
            <div class="upload-item">
              <div class="upload-label">背景大图</div>
              <el-upload
                class="avatar-uploader"
                :action="`${uploadApiBaseUrl}/upload/image`"
                :show-file-list="false"
                :on-success="handleBgUploadSuccess"
              >
                <img v-if="configData.bgImage" :src="configData.bgImage" class="banner">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

             <div class="upload-item">
              <div class="upload-label">banner图</div>
              <el-upload
                class="avatar-uploader"
                :action="`${uploadApiBaseUrl}/upload/image`"
                :show-file-list="false"
                :on-success="handleBannerUploadSuccess"
              >
                <img v-if="configData.bannerImage" :src="configData.bannerImage" class="banner">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="头部代码" prop="headerCode">
          <WangEditor
            v-if="!isCodeInput"
            v-model="configData.headerCode"
            placeholder="请输入头部代码"
            :height="300"
          />
          <el-input v-else v-model="configData.headerCode" :rows="10" type="textarea" placeholder="请输入头部代码" />
        </el-form-item>

        <el-form-item label="底部代码" prop="footerCode">
          <WangEditor
            v-if="!isCodeInput"
            v-model="configData.footerCode"
            placeholder="请输入底部代码"
            :height="300"
          />
          <el-input v-else v-model="configData.footerCode" :rows="10" type="textarea" placeholder="请输入底部代码" />
        </el-form-item>

        <el-form-item label="文章头部代码" prop="postHeaderCode">
          <WangEditor
            v-if="!isCodeInput"
            v-model="configData.postHeaderCode"
            placeholder="请输入文章头部代码"
            :height="300"
          />
          <el-input v-else v-model="configData.postHeaderCode" :rows="10" type="textarea" placeholder="请输入文章头部代码" />
        </el-form-item>

        <el-form-item label="文章底部代码" prop="postFooterCode">
          <WangEditor
            v-if="!isCodeInput"
            v-model="configData.postFooterCode"
            placeholder="请输入文章底部代码"
            :height="300"
          />
          <el-input v-else v-model="configData.postFooterCode" :rows="10" type="textarea" placeholder="请输入文章底部代码" />
        </el-form-item>

        <el-form-item  class="fixed left-[100px] bottom-[100px]">
            <div class="flex flex-col gap-[10px]">
                <el-button class="bg-(--primary)! border-0!" type="primary" @click="isCodeInput = !isCodeInput">{{isCodeInput ? '文本编辑' : '代码编辑'}}</el-button>

                <el-button class="bg-(--primary)! border-0! ml-0!" type="primary" @click="submitForm">保存配置</el-button>

            </div>
        </el-form-item>
      </el-form>

      <div v-else class="loading">加载中...</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getDefaultCaicai,updateCaicai } from '@/api/caicai'
import WangEditor from '@/components/wangEditor.vue'


const isCodeInput = ref(false)

const configForm = ref(null)
const configData = ref({
  name: '',
  logo: '',
  watermarkImage: '',
  bgImage: '',
  bannerImage: '',
  headerCode: '',
  footerCode: '',
  postHeaderCode: '',
  postFooterCode: '',
})

// 定义上传图片的API基础URL
const uploadApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

// 页面加载时获取配置数据
onMounted(async () => {
  try {
    const response = await getDefaultCaicai()
    if (response.success) {
      configData.value = response.data
    } else {
      ElMessage.error('获取配置失败: ' + response.message)
    }
  } catch (error) {
    ElMessage.error('获取配置失败: ' + error.message)
  }
})

// 处理Logo上传成功
const handleLogoUploadSuccess = (response) => {
  if (response.message == '上传成功') {
    console.log(response)
    configData.value.logo = response.data.url
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败: ' + response.message)
  }
}

// 处理水印图片上传成功
const handleWatermarkUploadSuccess = (response) => {
  if (response.message == '上传成功') {
    if (response.success) {
      configData.value.watermarkImage = response.data.url
      ElMessage.success('上传成功')
    } else {
      ElMessage.error('上传失败: ' + response.message)
    }       
  }
}

const handleBgUploadSuccess = (response) => {
  if (response.message == '上传成功') {
    configData.value.bgImage = response.data.url
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败: ' + response.message)
  }
}

// 处理背景大图上传成功
const handleBannerUploadSuccess = (response) => {
  if (response.message == '上传成功') {
    configData.value.bannerImage = response.data.url
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败: ' + response.message)
  }
}

// 提交表单
const submitForm = async () => {
  try {
    const response = await updateCaicai(configData.value.id, configData.value)
    if (response.success) {
      configData.value = response.data
      ElMessage.success('保存成功')
    } else {
      ElMessage.error('保存失败: ' + response.message)
    }
  } catch (error) {
    ElMessage.error('保存失败: ' + error.message)
  }
}
</script>

<style scoped>
.web-config-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-images-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.upload-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-label {
  margin-bottom: 10px;
  font-weight: 500;
  color: #606266;
}

.avatar-uploader {
  display: flex;
  align-items: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  object-fit: cover;
}

.banner {
  width: 200px;
  height: 120px;
  display: block;
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #909399;
}
</style>
