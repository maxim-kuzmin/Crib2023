import {
  type ApiOperationResponse,
  type ApiOperationResponseWithData,
  createApiOperationResponseWithData,
} from '../../../../../data';
import { type ArticleDomainListGetOperationOutput } from './ArticleDomainListGetOperationOutput';

export interface ArticleDomainListGetOperationResponse
  extends ApiOperationResponseWithData<ArticleDomainListGetOperationOutput> {
}

export function createArticleDomainListGetOperationResponse (
  options?: ApiOperationResponseWithData<ArticleDomainListGetOperationOutput> | ApiOperationResponse
): ArticleDomainListGetOperationResponse {
  return createApiOperationResponseWithData<ArticleDomainListGetOperationOutput>(options);
}
