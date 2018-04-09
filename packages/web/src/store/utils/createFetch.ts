import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { CANCEL } from 'redux-saga';
const host = process.env.REACT_APP_API_HOST;

export interface Fetch<Response = any> {
  (options?: AxiosRequestConfig): AxiosPromise<Response>;
}
export interface DataResponse<Data = any, Meta = any> {
  data: Data;
  meta?: Meta;
}

export const BASE_URL = `${host}/api` ;
const defaultOptions: AxiosRequestConfig = {
  method: 'get',
  baseURL: BASE_URL
};

export function createFetch<RawResponse = any>(baseOptions?: AxiosRequestConfig): Fetch<RawResponse> {
  const createRequest = axios.create(Object.assign({}, defaultOptions, baseOptions || {}));

  return (options?: AxiosRequestConfig) => {
    const source = axios.CancelToken.source();
    const config = Object.assign({}, options || {}, {
      cancelToken: source.token
    });
    const request = createRequest(config);

    request[CANCEL] = () => source.cancel();
    return request;
  };
}
