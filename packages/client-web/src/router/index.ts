import { async, IRoute } from './utils';

export const routes: IRoute[] = [
  {
    path: '/login',
    component: async(() => import('../pages/Login'))
  },
  {
    path: '/',
    component: async(() => import('../pages/AppShell')),
    routes: [
      {
        path: '/schedule',
        component: async(() => import('../pages/Schedule/Schedule'))
      },
      {
        path: '/lists',
        component: async(() => import('../pages/Lists'))
      }
    ]
  }
];
