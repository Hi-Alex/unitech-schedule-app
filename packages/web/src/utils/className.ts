import { join, compose } from 'ramda';
import { compact, flatten } from 'lodash';

export const cn = compose(
  join(' '),
  compact as any,
  flatten
);
