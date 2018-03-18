import { createStore, Store } from 'redux';
import { UserState, rootReducer } from './reducers';

export interface RootState {
  user?: UserState;
}
export const store = createStore<RootState>(rootReducer, {});
