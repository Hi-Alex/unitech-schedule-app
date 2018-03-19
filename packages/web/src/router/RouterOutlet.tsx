import * as React from 'react';
import { Route, RouteProps, Switch, SwitchProps } from 'react-router';
import { map } from 'ramda';

export interface IRoute extends RouteProps {
  routes?: IRoute[];
}

const mapRoutes = map(({ routes, component, ...route }: IRoute) => {
  const children = routes ? mapRoutes(routes) : [];
  const props = {
    ...route,
    render: props => React.createElement(component, props, children),
    key: route.path
  };

  return React.createElement(Route, props);
});

export interface RouterOutletProps {
  routes: RouteProps[];
  switch?: SwitchProps;
}

export class RouterOutlet extends React.Component<RouterOutletProps> {
  render() {
    const { switch: switchProps, routes } = this.props;

    return (
      <Switch {...switchProps}>{mapRoutes(routes)}</Switch>
    );
  }
}
