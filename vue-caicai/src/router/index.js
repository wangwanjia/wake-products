import { createRouter, createWebHashHistory } from "vue-router";
// import { useUserStore } from '@/store/modules/user'
// import { getToken } from '@/utils/auth'
// import { constantRoutes } from '@/router/constantRoutes'

const routes = [
  // 客户端页面
  {
    path: "/",
    component: () => import("@/layout/client/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/client/home/index.vue"),
      },
      {
        path: "home",
        component: () => import("@/views/client/home/index.vue"),
      },
      {
        path: "postDetail",
        component: () => import("@/views/client/postDetails/index.vue"),
      },
      {
        path: "rule",
        component: () => import("@/views/client/rule/index.vue"),
      },
      {
        path: "recharge",
        component: () => import("@/views/client/recharge/index.vue"),
      },
      {
        path: "register",
        component: () => import("@/views/client/register/index.vue"),
      },
      {
        path: "login",
        component: () => import("@/views/client/login/index.vue"),
      },
    ],
  },
  // 后台页面
  {
    path: "/admin",
    component: () => import("@/layout/admin/index.vue"),
    redirect: "admin/home",
    meta: { title: "首页" },
    children: [
      {
        path: "",
        component: () => import("@/views/admin/home/index.vue"),
      },
      {
        path: "home",
        component: () => import("@/views/admin/home/index.vue"),
      },
      {
        path: "userViews",
        component: () => import("@/views/admin/userViews/index.vue"),
        meta: { title: "访问记录" },
        children: [
          {
            path: "viewAdd",
            component: () => import("@/views/admin/userViews/viewAdd.vue"),
            meta: { title: "访问记录添加" },
          },
        ]
      },

      {
        path: "userManage",
        component: () => import("@/views/admin/userManage/index.vue"),
        meta: { title: "用户管理" },
        children: [
          {
            path: "userEdit",
            component: () => import("@/views/admin/userManage/userEdit.vue"),
            meta: { title: "用户编辑" },
          },
          {
            path: "userAdd",
            component: () => import("@/views/admin/userManage/userAdd.vue"),
            meta: { title: "用户添加" },
          },
        ]
      },
      
      {
        path: "postsManage",
        component: () => import("@/views/admin/postsManage/index.vue"),
        meta: { title: "帖子管理" },
        children: [
          {
            path: "postsEdit",
            component: () => import("@/views/admin/postsManage/postsEdit.vue"),
            meta: { title: "帖子编辑" },
          },
          {
            path: "postsAdd",
            component: () => import("@/views/admin/postsManage/postsAdd.vue"),
            meta: { title: "帖子添加" },
          },
        ] 
      },
      {
        path: "orderManage",
        component: () => import("@/views/admin/orderManage/index.vue"),
        meta: { title: "订单管理" },
        children: [
          // {
          //   path: "orderEdit",
          //   component: () => import("@/views/admin/orderManage/orderEdit.vue"),
          //   meta: { title: "订单编辑" },
          // },
          {
            path: "orderAdd",
            component: () => import("@/views/admin/orderManage/orderAdd.vue"),
            meta: { title: "订单添加" },
          },
        ]
      },
      {
        path: "resultsManage",
        name: 'ResultsManageIndex',
        component: () => import("@/views/admin/resultsManage/index.vue"),
        meta: { title: "结果管理" },
        children: [
          {
            path: "resultsEdit",
            component: () => import("@/views/admin/resultsManage/resultsEdit.vue"),
            meta: { title: "结果编辑" },
          },
          {
            path: "resultsAdd",
            component: () => import("@/views/admin/resultsManage/resultsAdd.vue"),
            meta: { title: "结果添加" },
          },
        ]
      },
      {
        path: "webConfig",
        component: () => import("@/views/admin/webConfig/index.vue"),
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
