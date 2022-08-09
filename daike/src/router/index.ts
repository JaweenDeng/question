
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      requireAuth: false
    },
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      requireAuth: false
    },
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/create',
    name: 'Create',
    meta: {
      title: '发布问题',
      requireAuth: true
    },
    component: () => import('@/pages/question/create.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '问题详情',
      requireAuth: false
    },
    component: () => import('@/pages/detail/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '我的',
      requireAuth: true
    },
    component: () => import('@/pages/user/index.vue')
  },
  {
    path: '/myQuestion',
    name: 'myQuestion',
    meta: {
      title: '我的问题',
      requireAuth: true
    },
    component: () => import('@/pages/user/myQuestion.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

//路由钩子
router.beforeEach((to,from,next) => {
  const tokenStr:String|null = localStorage.getItem('token');//获取token值
  if(to.meta.requireAuth && !tokenStr) {
    next(`/login?url=${to.fullPath}`)
    return
  }
  next()
})


export default router;
