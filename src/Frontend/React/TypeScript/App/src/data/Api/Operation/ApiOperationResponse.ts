import { type ApiResponseError } from '../Response';

export interface ApiOperationResponse {
  readonly error?: ApiResponseError | null;
  readonly operationCode: string;
  readonly operationName: string;
}
