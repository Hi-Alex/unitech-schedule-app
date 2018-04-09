import { Action, ActionFunction0, ActionFunction1, createAction } from 'redux-actions';

export interface RequestError {
  message: string;
}

export interface RequestActions<Options = any, Response = any> {
  request: ActionFunction1<Options, Action<Options>>;
  success: ActionFunction1<Response, Action<Response>>;
  cancel: ActionFunction0<Action<void>>;
  error: ActionFunction1<RequestError, Action<RequestError>>;
  clean: ActionFunction0<Action<void>>;
}

export function createRequestActions<Options = any, Response = any>(prefix: string): RequestActions<Options, Response> {
  const type = (value: string) => `${prefix}/${value}`;

  return {
    request: createAction<Options>(type('REQUEST')),
    success: createAction<Response>(type('SUCCESS')),
    cancel: createAction(type('CANCEL')),
    error: createAction<RequestError>(type('ERROR')),
    clean: createAction(type('CLEAN'))
  };
}
