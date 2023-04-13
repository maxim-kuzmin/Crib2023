import {
  type HttpRequestConfig,
  type HttpRequestResult
} from '../../all';

export interface HttpClient {
  readonly delete: (url: string, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly get: (url: string, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly post: (url: string, body: any, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly put: (url: string, body: any, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
}
