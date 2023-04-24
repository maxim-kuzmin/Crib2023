import { type ApiResponseResource } from './ApiResponseResource';

export interface ApiResponseHooks {
  readonly useResource: () => ApiResponseResource;
}
