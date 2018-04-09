import { RequestActions, RequestError } from './createRequestActions';
import { call, CallEffectFn, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import { Fetch } from './createFetch';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Action } from 'redux-actions';

export interface TransformResponse<RawResponse = any, Response = RawResponse> {
  (response: AxiosResponse<RawResponse>): Response;
}
export interface TransformError<Expected = RequestError> {
  (error: AxiosError): Expected;
}
export interface TransformOptions<Options = any> {
  (options: Options): AxiosRequestConfig;
}
export interface RequestLifecycleHandlers<RawResponse = any, Response = any, Options = any> {
  success?: CallEffectFn<any>;
  transformResponse: TransformResponse<RawResponse, Response>;
  transformOptions: TransformOptions<Options>;
  transformError: TransformError<Error>;
}

const defaultRequestLifecycleHandlers: RequestLifecycleHandlers = {
  transformResponse: ({ data }: AxiosResponse<any>) => data,
  transformOptions: value => value,
  transformError: ({ response }: AxiosError) => response!.data
};

export function createRequestSaga<Options, RawResponse = any, Response = any>(
  actions: RequestActions<Options, Response>,
  fetch: Fetch,
  handlers: Partial<RequestLifecycleHandlers<RawResponse, Response, Options>> = {}
) {
  const { transformResponse, transformError, transformOptions, success } = Object.assign(
    {},
    defaultRequestLifecycleHandlers,
    handlers
  );

  return function* requestSaga(options?: AxiosRequestConfig) {
    try {
      const result = yield call(fetch, transformOptions(options));

      if (success) {
        yield fork(success, result);
      }
      yield put(actions.success(transformResponse(result)));
    } catch (error) {
      yield put(actions.error(transformError(error)));
    } finally {
      if (yield cancelled()) {
        yield put(actions.clean());
      }
    }
  };
}

export function createRequestWatchSaga(actions: RequestActions, requestSaga: CallEffectFn<any>) {
  function* requestCancelWatcherSaga(request: any) {
    yield take(actions.cancel.toString());
    yield cancel(request);
  }

  function* requestStartWatcherSaga({ payload }: Action<any>) {
    const request = yield fork(requestSaga, payload, true);

    yield fork(requestCancelWatcherSaga, request);
  }

  return function* requestWatcherSaga() {
    yield takeLatest(actions.request.toString(), requestStartWatcherSaga);
  };
}
