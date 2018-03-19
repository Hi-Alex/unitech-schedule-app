import { async } from './async';
import { ComponentClass, StatelessComponent } from 'react';
import { RouteProps } from 'react-router';

export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: async(() => import('../pages/AppShell'))
  },
  {
    path: '/login',
    component: async(() => import('../pages/Login'))
  }
];
