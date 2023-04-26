import { type ApiResponseFactory } from '../data/Api/Response/ApiResponseFactory'

export interface Factories {
  readonly Api: {
    readonly Response: ApiResponseFactory;
  };
}
