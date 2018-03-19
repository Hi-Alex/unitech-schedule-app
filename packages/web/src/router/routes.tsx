import {  } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { DefaultLoadingPlaceholder } from './LoadingPlaceholder';

export const routes = [
  {
    path: '/',
    component: Loadable({
      loader: () => import('../pages/Login'),
      loading: DefaultLoadingPlaceholder
    })
  }
];
