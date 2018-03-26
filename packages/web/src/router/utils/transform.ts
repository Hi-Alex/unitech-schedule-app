import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import { map, ifElse, isEmpty, always } from 'ramda';

export interface IRoute extends RouteProps {
  routes?: IRoute[];
}

export const createRouteElement = ({ routes, component, ...route }: IRoute) =>
  React.createElement(Route, {
    ...route,
    render: createRouteRenderer(component, routes),
    key: route.path
  });

export const mapRoutesToElements = map(createRouteElement);

export const createSwitchElement = (routes: IRoute[]): React.ReactElement<any> =>
  React.createElement(Switch, null, ...mapRoutesToElements(routes));

export const createOptionalSwitchElement = ifElse(isEmpty, always(null), createSwitchElement);

export const createRouteRenderer = (component: React.ComponentType<any>, routes?: IRoute[]) => {
  const switchElement = createOptionalSwitchElement(routes);

  return props => React.createElement(component, props, switchElement);
};
