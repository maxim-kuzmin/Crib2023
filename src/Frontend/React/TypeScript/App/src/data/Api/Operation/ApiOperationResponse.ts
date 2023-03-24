import { type ApiResponseError } from '../../../all';

export interface ApiOperationResponse<TData> {
  readonly data?: TData | null;
  readonly error?: ApiResponseError | null;
  readonly operationCode: string;
}
