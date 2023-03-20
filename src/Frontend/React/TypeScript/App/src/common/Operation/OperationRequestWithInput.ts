import { type OperationRequest } from '../../all';

export interface OperationRequestWithInput<TInput> extends OperationRequest {
  input: TInput;
}
