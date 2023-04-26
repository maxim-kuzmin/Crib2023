import { type OperationHandlerConfig } from '../../../common';
import { type ApiRequestHandler } from '.';

export interface ApiRequestHooks {
  readonly useHandler: (config: OperationHandlerConfig) => ApiRequestHandler;
}
