import {
  type ApiRequestWithInput,
  type ArticleDomainItemGetOperationInput
} from '../../../../../all';

export interface ArticleDomainItemGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {}

export function createArticleDomainItemGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode: string = ''
): ArticleDomainItemGetOperationRequest {
  return {
    operationName: '@@ArticleDomainItemGet',
    operationCode,
    input
  };
}
