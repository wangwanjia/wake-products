import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/store/modules/user'
// import { getToken } from '@/utils/auth'
// import { constantRoutes } from '@/router/constantRoutes'



const routes = [
  // 客户端页面
  {
    path: '/',
    component: () => import('@/layout/client/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/client/home/index.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/client/home/index.vue')
      },
       {
        path: 'postDetail',
        component: () => import('@/views/client/postDetails/index.vue')
      },
      {
        path: 'rule',
        component: () => import('@/views/client/rule/index.vue')
      },
      {
        path:"recharge",
        component: () => import('@/views/client/recharge/index.vue')
      },
      {
        path:"register",
        component: () => import('@/views/client/register/index.vue')
      },
      {
        path:"login",
        component: () => import('@/views/client/login/index.vue')
      }
    ]
  },
  // 后台页面
  {
    path: '/admin',
    component: () => import('@/layout/admin/index.vue'),
    redirect: 'admin/home',
    children: [
      {
        path: '',
        component: () => import('@/views/admin/home/index.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/admin/home/index.vue')
      },
     
    ]
  },
  // 公共页面
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: { title: '404', hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: { title: '任意路由', hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router;
