
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user',()=> {


  const userInfo = ref({
    id: 0,
    name: '',
    avatar: '',
    level: 0,
    gold: 0,
  })
  // 退出登录
  const exitLogin = () => {
    userInfo.value = null;
  }
  // 登录
  const login = (data) => {
    // userInfo.value = data
    userInfo.value = {
      id: 1,
      name: 'wahahah',
      avatar: '01',
      level: 1,
      gold: 999,
    }
  }
  // 刷新用户信息
  const refreshUserInfo = () => {
    userInfo.value = null;
  }

  return {
    userInfo,
    exitLogin,
    login,
    refreshUserInfo,
  }
})
