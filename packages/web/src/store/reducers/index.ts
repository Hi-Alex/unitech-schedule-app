import { combineReducers, AnyAction } from 'redux';
import { userReducer, UserState } from './user';

export { UserState }
export const rootReducer = combineReducers({
  user: userReducer
});
