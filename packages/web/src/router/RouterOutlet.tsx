import * as React from 'react';
import { Route, RouteProps, Switch, SwitchProps } from 'react-router';
import { map } from 'ramda';

const mapRoutes = map((route: RouteProps) => (
  <Route {...route} key={route.path} />
));

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
