import { handleActions, Action } from 'redux-actions';
import { setActiveSidebarItem } from '../actions';
import { set, lensProp } from 'ramda';

export interface SideBarState {
  active?: string;
}

const setActive = set(lensProp('active'));

export const sideBarReducer = handleActions({
  [setActiveSidebarItem.toString()]: (state, { payload }) => setActive(payload, state),
}, {
  active: 'schedule'
});
