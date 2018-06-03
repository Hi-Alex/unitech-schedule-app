import * as Loadable from "react-loadable";
import * as React from "react";
import { always, merge } from "ramda";

export interface LoadingPlaceholder {
  error?: React.ComponentType;
  delay?: React.ComponentType;
  timeout?: React.ComponentType;
  loading?: React.ComponentType;
}

const mergeDefaultPlaceholders: (
  placeholders?: LoadingPlaceholder
) => LoadingPlaceholder = merge({
  error: always(<div>Something is wrong...</div>),
  delay: always(<div>Loading...</div>),
  timeout: always(<div>Timeout</div>),
  loading: always(null)
});

const getPlaceholder = (
  placeholders: LoadingPlaceholder,
  props: Loadable.LoadingComponentProps
): React.ComponentType => {
  if (props.error) return placeholders.error;
  if (props.timedOut) return placeholders.timeout;
  if (props.pastDelay) return placeholders.delay;
  return placeholders.loading;
};

export const createLoadingPlaceholder = (
  options: LoadingPlaceholder = {}
): React.ComponentType<Loadable.LoadingComponentProps> => {
  const placeholders = mergeDefaultPlaceholders(options);

  return props => {
    const Placeholder = getPlaceholder(placeholders, props);

    return <Placeholder {...props} />;
  };
};
export const DefaultLoadingPlaceholder = createLoadingPlaceholder();
