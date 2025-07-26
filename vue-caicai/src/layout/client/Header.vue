<template>

    <header class="c-wrap z-[999] sticky top-0 w-full h-[58px] bg-(--primary) flex items-center justify-between slide-in-down">
        <div class="max-w-[1000px] w-full mx-auto bg-(--primary) flex items-center justify-between">
            <div class="logo">
                <RouterLink to="/">
                    <img src="@/assets/logo.svg" class="hover:scale-110 transition-all duration-300" alt="" />
                </RouterLink>
            </div>


            <nav class="flex items-center gap-3 md:gap-5">
                <RouterLink :active-class="'border-b-[2px]'" to="/" class="hover:border-b-[2px] hover:text-white! border-solid border-b-white h-[40px] leading-[48px] inline-block text-white text-md md:text-lg font-bold">首页</RouterLink>
                <RouterLink :active-class="'border-b-[2px]'" to="/rule" class="hover:border-b-[2px] hover:text-white! border-solid border-b-white h-[40px] leading-[48px] inline-block text-white text-md md:text-lg font-bold">规则</RouterLink>
                <RouterLink :active-class="'border-b-[2px]'" to="/recharge" class="hover:border-b-[2px] hover:text-white! border-solid border-b-white h-[40px] leading-[48px] inline-block text-white text-md md:text-lg font-bold">充值</RouterLink>
                <span @click="clickService" class="cursor-pointer hover:border-b-[2px] hover:text-white! border-solid border-b-white h-[40px] leading-[48px] inline-block text-white text-md md:text-lg font-bold">客服</span>
         
            </nav>

            <div class="text-white font-bold text-md md:text-md">
                <!-- 未登录 -->
                <div class=" items-center gap-2 flex">
                    <button @click="clickLogin" class="border-[2px]! border-solid! border-white! hover:shadwo-lg! shadow-white! max-md:py-1! max-md:px-2! text-sm! font-bold! ">登 录</button>
                    <button @click="clickReginster" class="border-[2px]! border-solid! border-white! hover:shadwo-lg! shadow-white! max-md:py-1! max-md:px-2! text-sm! font-bold! ">注 册</button>
                </div>

                <!-- 已登录 -->
                <div class="hidden items-center gap-2 border-[2px] border-white  rounded-full px-2 py-1 hover:shadow-sm shadow-white">
                    <span class="inline-block max-w-[60px] overflow-hidden text-ellipsis whitespace-nowrap">caicai</span>
                    <img src="@/assets/images/avatars/01.gif" class="w-[30px] rounded-full" alt="" />
                </div>
            </div>
        </div>
    </header>


    <!-- 客服弹出框 -->
     <el-dialog
    v-model="dialogVisibleService"
    title="联系管理员客服"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
       
      </div>
    </template>
  </el-dialog>

</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const dialogVisibleService = ref(false);
const router = useRouter();

const clickLogin = () => {
    router.push({
        path:"/login"
    })
}
const clickReginster = () => {
    router.push({
        path:"/register"
    })
}

const clickService = () => {
  dialogVisibleService.value = true;
}


</script>



<style>
@media (max-width:996px){
    .el-dialog {
        width: 90% !important;
    }
}

</style>
