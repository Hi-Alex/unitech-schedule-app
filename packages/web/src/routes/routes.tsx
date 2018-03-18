import {  } from 'react-router-dom';

export interface IRoute {
  path: string;
  load?: <T>() => Promise<T>;
}
