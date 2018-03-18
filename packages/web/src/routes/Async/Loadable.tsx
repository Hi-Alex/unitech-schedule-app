import * as Loadable from "react-loadable";
import { DefaultLoadingPlaceholder } from "./LoadingPlaceholder";
import { merge, ifElse, identity, compose, defaultTo } from "ramda";
import { isFunction } from 'lodash';

const mergeDefaultLoadableOptions = merge({
  loading: DefaultLoadingPlaceholder,
  timeout: 10000,
  delay: 250
});
const toLoadableOptions: Loadable.OptionsWithoutRender<any> = compose(
  defaultTo({
    loader: () => Promise.resolve(null)
  }),
  ifElse(isFunction, loader => ({ loader }), identity)
);

export const load = (options?) => Loadable(toLoadableOptions(options));
