import { combineReducers, AnyAction } from 'redux';
import { userReducer } from './user';
import { sideBarReducer } from './sidebar';

export const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sideBarReducer
});
