import { type ApiRequestOptions } from './ApiRequestOptions';

export interface ApiRequestOptionsWithBody extends ApiRequestOptions {
  body: any;
}
