import {
  type ApiOperationResponse,
  type ApiOperationResponseWithData,
  createApiOperationResponseWithData,
} from '../../../../../data';
import { type ArticleDomainItemGetOperationOutput } from './ArticleDomainItemGetOperationOutput';

export interface ArticleDomainItemGetOperationResponse
  extends ApiOperationResponseWithData<ArticleDomainItemGetOperationOutput> {
}

export function createArticleDomainItemGetOperationResponse (
  options?: ApiOperationResponseWithData<ArticleDomainItemGetOperationOutput> | ApiOperationResponse
): ArticleDomainItemGetOperationResponse {
  return createApiOperationResponseWithData<ArticleDomainItemGetOperationOutput>(options);
}
