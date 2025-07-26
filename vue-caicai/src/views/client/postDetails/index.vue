<template>
  <div class="desc">插入代码</div>

  <div
    class="fade-in w-full bg-(--primary) flex justify-center items-center py-1 md:py-2 px-2"
  >
    <!-- 作者信息 -->
    <div class="flex justify-center items-center">
      <div class="text-white font-bold text-xs md:text-lg flex items-center">
        <img
          src="@/assets/images/avatars/01.gif"
          alt=""
          class="w-10 h-10 mr-2"
        />
        <p><span class="text-(--red) font-bold">寻彩百度</span></p>
      </div>

      <div class="flex items-center justify-center gap-2 ml-1 md:ml-2">
        <Level :level="10"></Level>
        <Icon name="vip"></Icon>
        <Icon name="pro" class="max-md:w-[16px] max-md:h-[16px]"></Icon>
      </div>
    </div>
    <!-- 退出登录 -->
    <button
      @click="goBack"
      class="ml-auto text-white max-md:py-1! max-md:px-2! text-xs! font-bold!"
    >
      返 回
    </button>
  </div>

  <div class="slide-in-up w-full h-full px-2">
    <!-- 文章信息 -->
    <h1
      class="w-full text-md md:text-2xl text-center font-bold flex justify-center items-center mt-5"
    >
      206期：顺意發高手【寻彩百度💯⒖码中特】已审核准予出售
    </h1>
    <p class="text-sm md:text-lg my-2 center gap-10 font-bold">
      <span>作者：寻彩百度</span>
      <span>浏览量：1000</span>
    </p>
    <div class="content">
        <!-- 免费内容 -->
      <div
        v-for="(item, index) in 10"
        class="text-md md:text-2xl px-2 py-1 bg-(--primary) text-white rounded-md my-2"
      >
        179期: 《寻彩百度》 🚗一①码中特🚗 【<span
          class="bg-(--red) font-bold rounded-sm px-1"
          >42</span
        >】 开: <span class="text-(--bg-color) font-bold">24</span> 错
      </div>

      
    <!-- 付费查看内容 -->
    <div class="bg-(--bg-color) rounded-md my-2">
      <div v-if="!isPay" class="text-md md:text-2xl px-2 py-1 text-white rounded-md">
        <p class="font-bold">高手已加密，打赏即可查看资料</p>
        <div class="center flex-col my-2">
            <button @click="showContent" class="animate-bounce font-bold! w-full md:w-[80%] bg-(--primary)! hover:bg-(--red)! py-1! rounded-md flex  justify-center items-center">
                <Icon name="gold"></Icon>
                588 金币，已有5 人打赏。 立即打赏
            </button>
            <div class="my-2 text-sm md:text-lg w-full bg-[#d9edf7] text-(--primary) p-2 rounded-md center flex-wrap font-bold">
                高手在此,手已加密,查看内容,查看内容,查看内容,查看内容
            </div>
            <p>打赏换来的是高手用心研究，有好料才能中奖.有回报才会有更多更准的六合高手发表资料</p>
        </div>
      </div>

      <!-- 打赏查看 -->
      <div v-else class="text-md md:text-2xl px-2 py-1 text-white rounded-md my-2">
        179期: 《寻彩百度》 🚗一①码中特🚗 【<span
          class="bg-(--red) font-bold rounded-sm px-1"
          >42</span
        >】 开: <span class="text-(--blue) font-bold">未开奖</span> 

      </div>
    </div>

    </div>

    <div class="desc">插入代码</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Level from "@/components/Icon-level.vue";
import Icon from "@/components/Icon.vue";

import { useRouter } from "vue-router";

// 返回
const router = useRouter();
const goBack = () => {
  router.back();
};

// 付费查看
const isPay = ref(false);
const showContent = () => {
  isPay.value = true;
};


</script>

<style scoped></style>
