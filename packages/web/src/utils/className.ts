import { join, compose, tap } from 'ramda';
import { compact, flatten } from 'lodash';

export const cn = compose(
  join(' '),
  tap(list => console.log('Final names', list)),
  compact as any,
  tap(list => console.log('Flatten names', list)),
  flatten
);
