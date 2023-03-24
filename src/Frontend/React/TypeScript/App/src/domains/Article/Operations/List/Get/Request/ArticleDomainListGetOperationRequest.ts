import {
  type ApiRequestWithInput,
  type ArticleDomainListGetOperationInput,
  createApiRequestWithInput,
} from '../../../../../../all';

export interface ArticleDomainListGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainListGetOperationInput> {}

export function createArticleDomainListGetOperationRequest (
  input: ArticleDomainListGetOperationInput,
  operationCode: string = ''
): ArticleDomainListGetOperationRequest {
  return createApiRequestWithInput<ArticleDomainListGetOperationInput>(
    '@@ArticleDomainListGet',
    input,
    operationCode);
}
