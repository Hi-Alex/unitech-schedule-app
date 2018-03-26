import * as React from 'react';
import { createSwitchElement, IRoute, setRelativePaths } from './utils';

export interface RouterOutletProps {
  routes: IRoute[];
  relative?: boolean;
}

export function RouterOutlet({ routes, relative = true }: RouterOutletProps): React.ReactElement<any> {
  return createSwitchElement(relative ? setRelativePaths(routes) : routes);
}
