import { type ApiResponseResource } from '../Response';

export interface ApiRequestCreationOptions {
  operationCode?: string;
  operationName: string;
  resourceOfApiResponse: ApiResponseResource;
}
