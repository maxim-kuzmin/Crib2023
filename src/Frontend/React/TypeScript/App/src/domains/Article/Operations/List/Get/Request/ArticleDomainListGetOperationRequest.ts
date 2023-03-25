import {
  type ApiRequestWithInput,
  type ArticleDomainListGetOperationInput,
} from '../../../../../../all';

export interface ArticleDomainListGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainListGetOperationInput> {}

export function createArticleDomainListGetOperationRequest (
  input: ArticleDomainListGetOperationInput,
  operationCode: string = ''
): ArticleDomainListGetOperationRequest {
  return {
    operationName: '@@ArticleDomainListGet',
    operationCode,
    input
  };
}
