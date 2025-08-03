<template>
  <div class="w-full">

    <div class="slide-in-up flex justify-center items-center py-2 md:py-4">
      <input v-model="searchText" type="text" placeholder="搜索帖子" class="outline-none text-sm md:text-lg min-w-[70%] py-1 px-2 rounded-[8px] border-1 border-solid border-(--primary) focus:border-(--primary) ">
      <button type="submit" @click="search" class="bg-(--primary) text-white px-2! py-1! rounded-[8px] ml-2 min-w-[50px] text-md md:text-lg">搜索</button>
      <button type="reset" @click="reset" class="bg-(--primary) text-white px-2! py-1! rounded-[8px] ml-2 min-w-[50px] text-md md:text-lg">重置</button>
    </div>

    <!-- 出售帖子 -->
    <h1 class="slide-in-up my-2 bg-(--bg-color) text-white text-md md:text-xl font-bold rounded-[3px] border-2 text-shadow-lg border-solid border-(--primary) py-1 text-center md:py-[6px]  whitespace-pre-wrap line-clamp-1">出售帖子</h1>
    <ul >
      <li v-for="item in 10" @click="toDetail(item)"  :class="{'border-b-1': item !== 10}" class="group hover:scale-101 hover:px-2 hover:rounded-[8px] hover:bg-(--primary) transition-all duration-300 cursor-pointer slide-in-up flex justify-between items-center py-4  border-solid border-(--primary)">
        <div class="flex items-center">
          <div class="headtopic w-[58px] md:w-[68px] mr-1 md:mr-2">
            <img src="@/assets/images/headtopic_1.gif" class="w-full" alt="" />
          </div>
          <h1 class="title text-sm md:text-lg font-bold whitespace-pre-wrap line-clamp-1 text-(--red) group-hover:text-white">
            202期:【★霸彩策略★六肖中特★】🀄澳彩网独创🀄
          </h1>
        </div>
        <p class="auther text-right text-sm md:text-lg font-bold whitespace-pre-wrap line-clamp-1 min-w-[66px] text-(--red) group-hover:text-white">霸彩策略</p>
      </li>
    </ul>


    <!-- 精品帖子 -->
    <h1 class="slide-in-up my-2 bg-(--bg-color) text-white text-lg md:text-xl font-bold rounded-[3px] border-2 text-shadow-lg border-solid border-(--primary) py-1 text-center md:py-[6px] whitespace-pre-wrap line-clamp-1 ">精品帖子</h1>
    <ul >
      <li v-for="item in 10" @click="toDetail(item)" :class="{'border-b-1': item !== 10}" class="group hover:scale-101 hover:px-2 hover:rounded-[8px] hover:bg-(--blue) transition-all duration-300 cursor-pointer slide-in-up flex justify-between items-center py-4 border-solid border-(--primary)">
        <div class="flex items-center">
          <div class="headtopic w-[58px] md:w-[68px] mr-1 md:mr-2">
            <img src="@/assets/images/headtopic_2.gif" class="w-full" alt="" />
          </div>
          <h1 class="title text-sm md:text-lg font-bold whitespace-pre-wrap line-clamp-1 text-(--red) group-hover:text-white transition-all duration-300">
            202期:【★霸彩策略★六肖中特★】🀄澳彩网独创🀄
          </h1>
        </div>
        <p class="auther text-right text-sm md:text-lg font-bold whitespace-pre-wrap line-clamp-1 min-w-[66px] text-(--red) group-hover:text-white transition-all duration-300">霸彩策略</p>
      </li>
    </ul>

    <!-- 热门帖子 -->

    <h1 class="slide-in-up my-2 bg-(--bg-color) text-white text-lg md:text-xl font-bold rounded-[3px] border-2 text-shadow-lg border-solid border-(--primary) py-1 text-center md:py-[6px]  whitespace-pre-wrap line-clamp-1">热门帖子</h1>
    <ul >
      <li v-for="item in 10" @click="toDetail(item)" :class="{'border-b-1': item !== 10}" class="group hover:scale-101 hover:px-2 hover:rounded-[8px] hover:bg-(--red) transition-all duration-300 cursor-pointer slide-in-up flex justify-between items-center py-4 border-solid border-(--primary)">
        <div class="flex items-center">
          <div class="headtopic w-[58px] md:w-[68px] mr-1 md:mr-2">
            <img src="@/assets/images/headtopic_3.gif" class="w-full" alt="" />
          </div>
          <h1 class="title text-sm md:text-lg font-bold whitespace-pre-wrap line-clamp-1 text-(--red) group-hover:text-white">
            202期:【★霸彩策略★六肖中特★】🀄澳彩网独创🀄
          </h1>
        </div>
        <p class="auther text-right text-sm md:text-lg font-bold whitespace-pre-wrap line-clamp-1 min-w-[66px] text-(--red) group-hover:text-white">霸彩策略</p>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute,useRouter } from "vue-router";

const router = useRouter();

// 跳转详情页
const toDetail = (item) => {
  router.push({
    path: '/postDetail',
    params: {
      id: item
    }
  })
}

const searchText = ref('');
const search = () => {
  if (searchText.value.trim() === '') {
    ElMessage({
      message: '请输入搜索内容',
      type: 'warning'
    });
    return;
  }
}

const reset = () => {
  searchText.value = '';
}

</script>

<style scoped></style>
