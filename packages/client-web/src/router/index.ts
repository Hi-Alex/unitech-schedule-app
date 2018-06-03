import { async, IRoute } from './utils';
import { ComponentClass, StatelessComponent } from 'react';

export const routes: IRoute[] = [
  {
    path: '/login',
    component: async(() => import('../pages/Login'))
  },
  {
    path: '/test',
    component: async(() => import('./testPages/Main')),
    routes: [
      {
        path: 'first',
        component: async(() => import('./testPages/First'))
      },
      {
        path: 'second',
        component: async(() => import('./testPages/Second')),
        routes: [
          {
            path: 'first',
            component: async(() => import('./testPages/First'))
          }
        ]
      }
    ]
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
