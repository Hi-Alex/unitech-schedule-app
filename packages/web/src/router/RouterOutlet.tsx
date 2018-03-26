import * as React from 'react';
import { createSwitchElement, IRoute } from './utils';

export interface RouterOutletProps {
  routes: IRoute[];
}

export function RouterOutlet({ routes }: RouterOutletProps): React.ReactElement<any> {
  return createSwitchElement(routes);
}
