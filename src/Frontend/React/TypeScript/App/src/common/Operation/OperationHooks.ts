import { type OperationHandler } from './OperationHandler';
import { type OperationHandlerConfig } from './OperationHandlerConfig';

export interface OperationHooks {
  readonly useOperationHandler: (config: OperationHandlerConfig) => OperationHandler;
}
