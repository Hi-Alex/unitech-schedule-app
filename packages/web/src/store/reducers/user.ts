import { handleActions, Action } from 'redux-actions';
import { setToken } from '../actions';
import { set, lensProp } from 'ramda';

export interface UserState {
  token?: string;
}

const setTokenProp = set(lensProp('token'));

export const userReducer = handleActions<UserState>({
  [setToken.toString()]: (state, { payload }) => setTokenProp(payload, state)
}, {
  token: null
});
