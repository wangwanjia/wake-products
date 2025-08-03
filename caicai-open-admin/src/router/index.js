import { createRouter, createWebHashHistory } from "vue-router";
// import { useUserStore } from '@/store/modules/user'
// import { getToken } from '@/utils/auth'
// import { constantRoutes } from '@/router/constantRoutes'

const routes = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    
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

export default router;
