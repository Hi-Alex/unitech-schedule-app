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
      },
      {
        path: '/housings',
        component: async(() => import('../pages/Housings'))
      },
      {
        path: '/faculties',
        component: async(() => import('../pages/Faculties'))
      },
      {
        path: '/cathedras',
        component: async(() => import('../pages/Cathedras'))
      },
      {
        path: '/specialities',
        component: async(() => import('../pages/Specialities'))
      },
      {
        path: '/groups',
        component: async(() => import('../pages/Groups'))
      },
      {
        path: '/workers',
        component: async(() => import('../pages/Workers'))
      },
      {
        path: '/classrooms',
        component: async(() => import('../pages/Classrooms'))
      },
    ]
  }
];
