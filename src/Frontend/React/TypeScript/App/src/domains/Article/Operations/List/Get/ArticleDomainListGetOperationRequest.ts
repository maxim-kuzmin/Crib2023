import { type ApiRequestWithInput } from '../../../../../data';
import { type ArticleDomainListGetOperationInput } from './ArticleDomainListGetOperationInput';

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
