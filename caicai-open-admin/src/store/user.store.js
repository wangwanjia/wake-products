
import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 定义用户store
export const useUserStore = defineStore('user', () => {
  // token
  const token = ref('')
  token.value = localStorage.getItem('token') ? localStorage.getItem('token') : ''

  // 设置token
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  // 退出登录
  const exitLogin = () => {
    token.value = ''
    localStorage.removeItem('token')
    ElMessage.success('退出登录成功')
  }

  // 初始化状态
  const initState = () => {
    // 从localStorage获取token
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  // 组件挂载时初始化
  onMounted(() => {
    initState()
  })

  return {
    token,
    setToken,
    exitLogin,

  }
})
