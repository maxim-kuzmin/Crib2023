import { type HttpRequestConfig } from './HttpRequestConfig';

export interface HttpRequest {
  body?: any;
  config?: HttpRequestConfig;
  url: string;
}
