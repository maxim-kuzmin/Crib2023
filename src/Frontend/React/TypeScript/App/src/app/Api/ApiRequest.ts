import { type HttpRequestConfig } from '../Http';

export interface ApiRequest {
  body?: any;
  config?: HttpRequestConfig;
  url: string;
}
