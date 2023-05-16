import { type HttpConfig } from './HttpConfig';

export interface HttpRequest {
  body?: any;
  config?: HttpConfig;
  url: string;
}
