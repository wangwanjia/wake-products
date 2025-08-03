

<template>
  <div class="w-full h-[100vh]">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="w-auto! h-[100vh] border-r-2 border-gray-200 bg-(--primary)">
        <div class="logo w-full center py-2 h-[60px]">
            <RouterLink to="/admin">
                <img src="@/assets/logo.svg" class="hover:scale-110 transition-all duration-300" alt="" />
            </RouterLink>
        </div>
          <el-menu class=""  :default-active="defaultActive.path" :router="true" :collapse="isCollapse">
              <el-menu-item v-for="item in menuRoutes" :key="item.path" :index="item.path">
                <Icon :name="item.icon" white="20" height="20" />
                <span class="text-md md:text-lg hover:text-white!">{{ item.name }}</span>
              </el-menu-item>
          </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header height="60px" class="bg-(--primary)">
          <div class="w-full h-full flex items-center justify-between">
            <div class="flex items-center">
              <Icon @click="isCollapse = !isCollapse" name="menu" white="20" height="20" />
              <el-breadcrumb separator="/" class="breadcrumb-container">
                <el-breadcrumb-item
                  v-for="(item, index) in $route.matched"
                  :key="index"
                  :to="{ path: item.path }"
                  :class="{ 'last-breadcrumb': index === $route.matched.length - 1 }"
                >
                  {{ item.meta.title }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="flex items-center">
              <Icon name="manager" white="20" height="20" />
              <span class="text-md md:text-lg font-bold text-white">超级管理员</span>
            </div>
          </div>
        </el-header>
        <!-- 内容区域 -->
        <el-main class="h-[calc(100vh-130px)]">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
        <!-- 底部 -->
        <el-footer height="30px" class="bg-(--primary)">
          <div class="w-full h-full flex items-center justify-center ">
            <span class="max-md:text-[10px] text-sm text-white/60">
              欢迎使用{{ appName }}系统，当前版本为{{ appVersion }}，如需帮助，请联系超级管理员。
            </span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const router = useRouter()

const menuRoutes = [
  {
    path: '/',
    name: '首页',
    icon: 'home',
  },
  {
    path: '/userManage',
    name: '用户管理',
    icon: '用户管理',
  },
  {
    path: '/resultsManage',
    name: '开奖管理',
    icon: '开奖管理',
  },
  {
    path: '/webConfig',
    name: '网站配置',
    icon: 'settings',
  },
]
const findDefaultActive = () => {
  const currentPath = router.currentRoute.value.path
  const menuItem = menuRoutes.find(item => item.path === currentPath)
  return menuItem ? menuItem : menuRoutes[0]
}
const defaultActive = ref(findDefaultActive())


const isCollapse = ref(false);//菜单折叠

// 系统名称 版本号
const appName = import.meta.env.VITE_APP_NAME
const appVersion = import.meta.env.VITE_APP_VERSION



// 路由处理
// const handleRouteChange = (path) => {
//   defaultActive.value = path
// }
// // 监听路由变化
// watch(() => router.currentRoute.value.path, handleRouteChange)


</script>


<style scoped>
.el-menu{
  border-right: none;
}
:deep(.el-menu){
  background-color: var(--primary);
  color: white;

}

:deep(.el-sub-menu__title){
  color: white;
  font-weight: bold;

}
:deep(.el-sub-menu__title:hover){
   background-color: var(--bg-color);
}

:deep(.el-menu-item){
  color: white;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
:deep(.el-menu-item:last-child){
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
:deep(.el-menu-item:hover){
  background-color: var(--bg-color);
}

:deep(.el-menu-item-group__title){
  color: white;
  opacity: 0.8;
}

:deep(.el-menu-item.is-active){
  background-color: var(--bg-color);
}


:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 200px;
}

:deep(.el-breadcrumb__inner.is-link){
  color: white;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner){
  color: white;
  opacity: 0.8;
}
:deep(.el-breadcrumb__separator){
  color: white;
}


</style>
