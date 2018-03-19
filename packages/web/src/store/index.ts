import { createStore, Store } from 'redux';
import { rootReducer } from './reducers';
import { SideBarState } from './reducers/sidebar';
import { UserState } from './reducers/user';

export interface RootState {
  user?: UserState;
  sidebar?: SideBarState;
}
export const store = createStore<RootState>(rootReducer, {});
