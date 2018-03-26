import * as React from 'react';
import * as Loadable from 'react-loadable';
import { merge, always, ifElse, compose, defaultTo } from 'ramda';
import { isFunction, identity } from 'lodash';
import { DefaultLoadingPlaceholder } from '../LoadingPlaceholder';

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

export const async = options => Loadable(toLoadableOptions(options));
