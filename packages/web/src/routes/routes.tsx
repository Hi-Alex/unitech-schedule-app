import {  } from 'react-router-dom';

export interface IRoute<T = any> {
  path: string;
  load?: () => Promise<T>;
  component?: React.ComponentClass<any>;
}

export const routes: IRoute[] = [
  {
    path: '/',
    load: () => null
  }
]
