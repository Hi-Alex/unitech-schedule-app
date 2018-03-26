import * as React from 'react';
import * as Loadable from 'react-loadable';
import { merge, always, ifElse, compose, defaultTo } from 'ramda';
import { isFunction, identity } from 'lodash';
import { DefaultLoadingPlaceholder } from '../LoadingPlaceholder';

const LOADABLE = '@@Async/Loadable';
const getDefault = target => target && target.__esModule ? target.default : target;
const render = (target, props) => React.createElement(getDefault(target), props);

const mergeDefaultLoadable = merge({
  timeout: 10000,
  loading: DefaultLoadingPlaceholder,
  loader: always(Promise.resolve({})),
  delay: 250,
  render
});
const toLoadableOptions = compose(
  mergeDefaultLoadable,
  defaultTo({}),
  ifElse(isFunction, loader => ({ loader }), identity)
);

export const toAsync = funcOrComponent => isAsync(funcOrComponent) ? funcOrComponent : async(funcOrComponent);
export const isAsync = Component => (Component as any).__async === LOADABLE;
export const async = options => {
  const Component = Loadable(toLoadableOptions(options));

  (Component as any).__async = LOADABLE;
  return Component;
};
