<template>
  <div class="w-full">
    <!-- 头部插入内容 -->
    <div
      class="fade-in head-insert w-full border-1 border-solid border-(--primary) my-1"
    >
      头部插入内容
    </div>

    <!-- 用户信息 -->
   <IsLogin></IsLogin>
    <!-- 分割-->
    <div class="w-full mb-1">
      <img src="@/assets/images/other/wd.jpg" alt="" />
    </div>

    <!-- 主题内容文章列表 -->
    <div class="main-content px-2">
      <PostList></PostList>
    </div>

    <!-- 底部插入的内容 -->
    <div class="footer-insert">底部插入的内容</div>
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import IsLogin from "../components/IsLogin.vue";

</script>

<style scoped></style>
