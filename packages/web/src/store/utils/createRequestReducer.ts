import { RequestActions, RequestError } from './createRequestActions';
import { Action, handleActions } from 'redux-actions';
import * as assoc from 'ramda/src/assoc';
import * as merge from 'ramda/src/merge';

export interface RequestState<Response = any> {
  loading: boolean;
  error?: RequestError;
  start?: number;
  data?: Response;
}

export interface RequestHandlers<State, Options = any, Response = any> {
  request: (state: State, action: Action<Options>) => State;
  success: (state: State, action: Action<Response>) => State;
  cancel: (state: State, action: Action<any>) => State;
  clean: (state: State, action: Action<any>) => State;
  error: (state: State, action: Action<RequestError>) => State;
}

const setStartProp = assoc('start');
const setLoadingProp = assoc('loading');
const setLoadingFalse = (state: RequestState<any>) => setLoadingProp(false, state);
const createState = (error?: RequestError, data: any = void 0, loading = false) => ({ error, data, loading });

const defaultHandlers: RequestHandlers<RequestState> = {
  request: state => setStartProp(Date.now(), merge(state, { loading: true })),
  success: (state, { payload }: Action<Response>) => merge(state, createState(void 0, payload)),
  cancel: setLoadingFalse,
  clean: setLoadingFalse,
  error: (state, { payload }: Action<RequestError>) => merge(state, createState(payload!))
};
const withDefaultHandlers = merge(defaultHandlers);

export function createRequestHandlers<Response = any, State = RequestState<Response>>(
  actions: RequestActions<any, Response>,
  handlers: Partial<RequestHandlers<State, any, Response>> = {}
) {
  const { request, success, cancel, clean, error } = withDefaultHandlers(handlers);

  return {
    [actions.request.toString()]: request,
    [actions.success.toString()]: success,
    [actions.cancel.toString()]: cancel,
    [actions.clean.toString()]: clean,
    [actions.error.toString()]: error
  };
}

export function createRequestReducer<Response = any, State = RequestState<Response>>(
  actions: RequestActions<any, Response>,
  handlers: Partial<RequestHandlers<State, any, Response>> = {},
  initialState: State = {
    loading: false
  } as any
) {
  return handleActions<State, RequestError | Response | void>(
    createRequestHandlers<Response, State>(actions, handlers) as any,
    initialState
  );
}
