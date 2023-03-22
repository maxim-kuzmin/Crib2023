import {
  type ApiRequestWithInput,
  type ArticleDomainItemGetOperationInput,
  createApiRequestWithInput,
} from '../../../../../all';

export interface ArticleDomainItemGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {}

export function createArticleDomainItemGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode: string = ''
): ArticleDomainItemGetOperationRequest {
  return createApiRequestWithInput<ArticleDomainItemGetOperationInput>(
    '@@ArticleDomainItemGet',
    input,
    operationCode);
}
