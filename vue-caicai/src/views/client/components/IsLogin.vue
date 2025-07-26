<template>
  <div class="w-full">
    <!-- 用户信息 -->
    <div
      class="fade-in w-full mt-1 bg-(--primary) flex justify-center items-center py-1 md:py-2 px-2"
    >
      <!-- 未登录 -->
      <div
        v-if="userStore.userInfo !== null"
        class="center text-white font-bold text-xs md:text-lg gap-5"
      >
        <span>您现在是游客: </span>
         <button
         @click="toLogin"
          class="text-white max-md:py-1! max-md:px-2! text-xs! font-bold!"
        >
          登录
        </button>
         <button
         @click="toRegister"
          class="text-white max-md:py-1! max-md:px-2! text-xs! font-bold!"
        >
          注册
        </button>
      </div>
      <!-- 已登录 -->
      <div v-else class="w-full flex justify-between items-center">
        <div class="flex justify-center items-center">
          <div class="text-white font-bold text-xs md:text-lg">
            您好！wahaha，欢迎您回来！
          </div>
          <!-- 等级 -->
          <div class="flex items-center">
            <Level :level="1"></Level>
          </div>
          <!-- 金币 -->
          <div class="flex items-center ml-1 md:ml-2">
            <Icon name="gold"></Icon>
            <p class="text-white font-bold text-xs md:text-lg">1000</p>
          </div>
        </div>
        <!-- 退出登录 -->
        <button
          class="ml-auto text-white max-md:py-1! max-md:px-2! text-xs! font-bold!"
        >
          退出登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import Level from "@/components/Icon-level.vue";
import Icon from "@/components/Icon.vue";
import { useRouter } from 'vue-router';
const router = useRouter();

import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const exitLogin = () => {
  userStore.exitLogin();
};

const toLogin = () => {
  router.push({
    path: '/login'
  })
}
const toRegister = () => {
  router.push({
    path: '/register'
  })
}
</script>

<style scoped></style>
