import { RouterView } from 'vue-router';

export default [
  // demo
  {
    path: '/demo',
    name: 'demo',
    component: RouterView,
    meta: {
      title: 'demo',
    },
    children: [
      {
        path: 'demo1',
        name: 'demo1',
        component: () => import('@/page/demo/Demo1.vue'),
        meta: {
          title: 'demo1',
        },
      },
    ],
  },
];
