<template>
  <div class="w-full relative px-2 py-5 md:py-10">
    <button
      @click="clickBack"
      class="absolute top-2 right-2 bg-(--green) text-white font-bold! text-sm! md:text-md! py-1! px-md!"
    >
      返回上一页
    </button>

    <h1 class="text-center text-xl md:text-3xl font-bold mb-5 md:mb-10">
      登 录
    </h1>

    <div class="w-full max-w-md mx-auto">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="password" placeholder="请输入密码"></el-input>
        </el-form-item> 
        <div class="flex">
          <el-form-item label="验证码：" prop="code" >
            <el-input v-model="code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <canvas
              id="captchaCanvas"
              width="100"
              height="30"
              class="w-[100px] h-[31px] cursor-pointer border border-gray-300"
              @click="generateCaptcha"
              title="点击刷新验证码"
            ></canvas>
        </div>
      </el-form>
      
      <div class="pl-[80px]">
        <button
        class="w-full text-white bg-(--primary)! hover:bg-(--red)! duration-300"
        type="primary"
        @click="login"
      >
        登 录
      </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const code = ref("");
const captchaCode = ref("");
const router = useRouter();

const form = ref({
  username: "",
  password: "",
  confirmPassword: "",
  phone: "",
  email: "",
  code: "",
});

const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请确认密码", trigger: "blur" }],
  phone: [{ required: false, message: "请输入手机号", trigger: "blur" }],
  email: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});





// 登录
const login = () => {

  if (!code.value || code.value.toUpperCase() !== captchaCode.value) {
    alert("验证码错误，请重新输入");
    generateCaptcha();
    return;
  }

  // 这里可以添加用户名和密码的验证逻辑
  router.push({ path: "/" });
};

const clickBack = () => {
  router.back();
};


// 生成随机验证码
const generateCaptcha = () => {
//   const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  captchaCode.value = result;
  console.log(captchaCode.value);
  drawCaptcha();
};

// 绘制验证码到canvas
const drawCaptcha = () => {
  const canvas = document.getElementById("captchaCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制背景
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // 绘制验证码文本
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 每个字符使用不同颜色和位置
  for (let i = 0; i < captchaCode.value.length; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 100 + 50}, ${
      Math.random() * 100 + 50
    }, ${Math.random() * 100 + 50})`;
    const x = 20 + i * 20;
    const y = canvas.height / 2;
    const rotation = (Math.random() - 0.5) * 0.5;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(captchaCode.value[i], 0, 0);
    ctx.restore();
  }
};


// 组件挂载时生成验证码
onMounted(() => {
  generateCaptcha();
});
</script>

<style scoped></style>
