import { type OperationInput } from './OperationInput';
import { type OperationResult } from './OperationResult';

export interface OperationHandler {
  readonly handleError: (error: any) => void;
  readonly handleStart: (operationInput: OperationInput) => void;
  readonly handleSuccess: (operationResult: OperationResult) => void;
  readonly operationCode: string;
}
