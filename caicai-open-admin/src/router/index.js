// 已在下方重新导入
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user.store'
import { ElMessage } from 'element-plus'

const routes = [
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: { title: '登录', hidden: true }
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "access",
        component: () => import("@/views/userAccess/index.vue"),
        meta: { title: "访问记录" },
      },
      {
        path: "userManage",
        component: () => import("@/views/userManage/index.vue"),
        meta: { title: "用户管理" },
        children: [
          {
            path: "userEdit",
            component: () => import("@/views/userManage/userEdit.vue"),
            meta: { title: "用户编辑" },
          },
          {
            path: "userAdd",
            component: () => import("@/views/userManage/userAdd.vue"),
            meta: { title: "用户添加" },
          },
        ]
      },
      {
        path: "resultsManage",
        name: 'ResultsManageIndex',
        component: () => import("@/views/resultsManage/index.vue"),
        meta: { title: "结果管理" },
        children: [
          {
            path: "resultsEdit",
            component: () => import("@/views/resultsManage/resultsEdit.vue"),
            meta: { title: "结果编辑" },
          },
          {
            path: "resultsAdd",
            component: () => import("@/views/resultsManage/resultsAdd.vue"),
            meta: { title: "结果添加" },
          },
        ]
      },
      {
        path: "webConfig",
        component: () => import("@/views/webConfig/index.vue"),
        meta: { title: "网站配置" },
      },
    ],
  },
  // 公共页面
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: { title: "404", hidden: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: { title: "任意路由", hidden: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 管理平台` : '管理平台';

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const userStore = useUserStore();
    // 检查是否已登录
    if (userStore.token) {
      next();
    } else {
      // 未登录，重定向到登录页
      ElMessage.warning('请先登录');
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    // 不需要认证的页面
    next();
  }
});

export default router;
