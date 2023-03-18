import { type HttpRequestConfig } from '../../all';

export interface ApiRequest {
  body?: any;
  config?: HttpRequestConfig;
  url: string;
}
