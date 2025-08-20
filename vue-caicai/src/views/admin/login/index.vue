<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <div class="login-card">
      <div class="login-title">
        <h2>彩彩系统登录</h2>
        <p>欢迎使用彩彩管理平台</p>
      </div>
      <el-form
        ref="refLoginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            :validate-event="false"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            :validate-event="false"
          />
        </el-form-item>
        <el-form-item prop="captcha">
          <div class="captcha-container">
            <el-input
              v-model="loginForm.captcha"
              placeholder="请输入验证码"
              :prefix-icon="Key"
              :validate-event="false"
              class="captcha-input"
            />
            <div class="captcha-code" @click="refreshCaptcha">
              {{ captchaCode }}
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin"
            :loading="loading"
            class="login-btn"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock, Key } from "@element-plus/icons-vue";
import { loginAdmin } from "@/api/user";
import { useUserStore } from "@/store/user.store";

// 路由实例
const router = useRouter();
// 用户Store
const userStore = useUserStore();
// 表单引用
const refLoginFormRef = ref(null);

// 获取客户端IP
const getClientIp = async () => {
  try {
    const ip = await fetch("https://api.ipify.org");
    if (!ip) {
      throw new Error("获取IP失败");
    }
    return ip;
  } catch (error) {
    console.error("获取IP地址时出错:", error);
    throw new Error("获取IP失败");
  }
};
const loginForm = reactive({
  username: "",
  password: "",
  captcha: "",
});
// 表单规则
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  captcha: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { len: 4, message: "验证码长度为4位", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== captchaCode.value) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },

  ],
};
// 加载状态
const loading = ref(false);
// 验证码
const captchaCode = ref("");
// 生成随机验证码
const generateCaptcha = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  captchaCode.value = code;
};
// 刷新验证码
const refreshCaptcha = () => {
  generateCaptcha();
};
// 处理登录
const handleLogin = async () => {
  // 表单校验
  const valid = await refLoginFormRef.value.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  try {
    const res = await loginAdmin(loginForm);
    if (res.token) {
      // 存储token
      userStore.setToken(res.token);
      ElMessage.success("登录成功");
      // 跳转到首页
      router.push("/");
    } else {
      ElMessage.error(res.message || "登录失败");
      refreshCaptcha();
    }
  } catch (error) {
    ElMessage.error("网络异常，请稍后重试");
    refreshCaptcha();
  } finally {
    loading.value = false;
  }
};
// 组件挂载时
onMounted(() => {
  // 生成验证码
  generateCaptcha();
  // 添加动画效果
  const loginCard = document.querySelector(".login-card");
  setTimeout(() => {
    loginCard.style.opacity = "1";
    loginCard.style.transform = "translateY(0)";
  }, 100);
});
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/banner/macao.png");
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.login-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 20%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 20%
    );
}
.login-card {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.login-title {
  text-align: center;
  margin-bottom: 30px;
}
.login-title h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}
.login-title p {
  font-size: 14px;
  color: #666;
}
.login-form {
  width: 100%;
}
.captcha-container {
  display: flex;
  gap: 10px;
}
.captcha-input {
  flex: 1;
}
.captcha-code {
  width: 100px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #333;
  cursor: pointer;
  user-select: none;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 22px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary) 100%);

  border: none;
  transition: all 0.3s ease;
}
.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(107, 115, 255, 0.4);
}
@media (max-width: 480px) {
  .login-card {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>
