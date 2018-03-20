import { async } from './async';
import { ComponentClass, StatelessComponent } from 'react';
import { IRoute } from './RouterOutlet';

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
        component: async(() => import('../pages/Schedule'))
      },
      {
        path: '/lists',
        component: async(() => import('../pages/Lists'))
      }
    ]
  }
];
