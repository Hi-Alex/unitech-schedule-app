import { createAction, Action } from 'redux-actions';
import { identity } from 'lodash';

export const setActiveSidebarItem = createAction<string, string>(
  'SET_ACTIVE', identity
);
