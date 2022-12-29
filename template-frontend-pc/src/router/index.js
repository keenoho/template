import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import routes from './routes';
import { beforeEach, afterEach } from './navigationGuards';

// 实例化路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/page/login/index.vue'),
      meta: {
        needAuth: false,
      },
    },
    {
      name: 'layout',
      path: '/',
      component: Layout,
      children: [
        {
          name: 'home',
          path: '/',
          component: () => import('@/page/home/index.vue'),
          meta: {
            title: '管理后台',
          },
        },
        ...routes,
      ],
    },
    {
      name: 'notFound',
      path: '/:pathMatch(.*)*',
      component: () => import('@/page/error/index.vue'),
      meta: {
        needAuth: false,
      },
    },
  ],
});

// 路由守护
router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
