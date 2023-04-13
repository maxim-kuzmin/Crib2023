import {
  type OperationInput,
  type OperationResult
} from '../../all';

export interface OperationHandler {
  readonly handleError: (error: any) => void;
  readonly handleStart: (operationInput: OperationInput) => void;
  readonly handleSuccess: (operationResult: OperationResult) => void;
  readonly operationCode: string;
}
