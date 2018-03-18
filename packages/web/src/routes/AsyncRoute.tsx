import * as React from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from './routes';
import * as Loadable from 'react-loadable';
import { DefaultLoading } from './DefaultLoading';

export function getLoadable({ load, component }: IRoute): React.ComponentType {
  if (component) return component;
  return Loadable({
    loader: load,
    loading: DefaultLoading
  })
}

export class AsyncRoute extends React.Component<IRoute> {
  render() {
    const { path, component, load } = this.props;

    return (
      <Route
        path={path}
        render={props => null}
      />
    )
  }
}
