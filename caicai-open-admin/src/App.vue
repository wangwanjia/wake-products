<script setup>
</script>
<template>
  <main class="scheme-light dark:scheme-dark">
    <!-- 为了确保子路由组件能被缓存，需要确保子路由组件有对应的 name 属性 -->
    <!-- 同时可以通过 include/exclude 属性来指定需要缓存的组件 -->
    <!-- 以下展示使用 include 的示例，你需要将 'ComponentName' 替换为实际要缓存的组件名 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive> 
  </main>
</template>

<style scoped>
</style>
