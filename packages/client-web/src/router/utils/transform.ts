import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import { map, ifElse, isEmpty, always, anyPass, isNil, clone } from 'ramda';
import { toAsync } from './async';

export type AsyncImportFn = (...args: any[]) => Promise<any>;
export interface IRoute extends RouteProps {
  routes?: IRoute[];
  async?: boolean | React.ComponentType<any> | AsyncImportFn;
}

const trimR = value => value.replace(/\/$/g, '');

export const setRelativePaths = (routes: IRoute[], parent?: IRoute): IRoute[] => routes.map(baseRoute => {
  const route = clone(baseRoute);

  if (parent && (!route.path || route.path.charAt(0) !== '/')) {
    route.path = `${trimR(parent.path || '')}/${route.path || ''}`;
  }
  if (route.routes) {
    route.routes = setRelativePaths(route.routes, route);
  }
  return route;
});

export const createRouteElement = ({ routes, component, path, async, ...route }: IRoute) =>
  React.createElement(Route, {
    ...route,
    render: createRouteRenderer(component || toAsync(async), routes),
    path,
    key: path
  });

export const mapRoutesToElements = map(createRouteElement);

export const createSwitchElement = (routes: IRoute[]): React.ReactElement<any> =>
  React.createElement(Switch, null, ...mapRoutesToElements(routes));

export const createOptionalSwitchElement = ifElse(anyPass([isEmpty, isNil]), always(null), createSwitchElement);

export const createRouteRenderer = (component: React.ComponentType<any>, routes?: IRoute[]) => {
  const switchElement = createOptionalSwitchElement(routes);

  return props => React.createElement(component, props, switchElement);
};
