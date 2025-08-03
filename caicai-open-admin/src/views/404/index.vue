<template>
    <div class="not-found absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[50%] center flex-col">
        <h1 class="text-lg md:text-2xl font-bold center mb-4">没有找到页面 

            <svg  t="1753200531158" class="icon mx-1 animate-bounce" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4434" width="32" height="32"><path d="M514 114.3c-219.9 0-398.8 178.9-398.8 398.8 0 220 178.9 398.9 398.8 398.9s398.8-178.9 398.8-398.9c0-219.8-178.9-398.8-398.8-398.8z m232.1 440.4L582 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.5-17.2-26.5-17.2-41.5s5.7-30.1 17.2-41.5l63.8-63.8H334c-32.5 0-58.8-26.3-58.8-58.8s26.3-58.8 58.8-58.8h228.7l-63.8-63.8c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 23 22.9 60.2 0 83.1z" fill="#039e6d" p-id="4435"></path></svg>
            <button @click="goBack" class="text-white font-bold!" to="/" >返回上一页</button>
        </h1>
        <img class="w-[80%] rounded-md" src="@/assets/images/404.jpeg" alt="" />
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
    router.back()
}
</script>
<style scoped>

</style>
