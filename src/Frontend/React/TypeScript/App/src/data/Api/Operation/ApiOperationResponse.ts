import { type ApiResponseError } from '../Response';

export interface ApiOperationResponse<TData> {
  readonly data?: TData | null;
  readonly error?: ApiResponseError | null;
  readonly operationCode: string;
  readonly operationName: string;
}
