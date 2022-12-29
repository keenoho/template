import routes from '@/router/routes';
import { routesToMenus } from '@/util';

// 固定menu
export const immobilizationMenus = [
  // {
  //   id: 'test',
  //   name: '测试页面',
  //   path: '/test'
  // }
];

// 根据路由转成menu
export const routesMenus = routesToMenus(routes);
