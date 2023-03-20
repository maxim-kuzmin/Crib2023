import { type HttpRequestConfig } from '../../all';

export interface HttpRequest {
  body?: any;
  config?: HttpRequestConfig;
  url: string;
}
