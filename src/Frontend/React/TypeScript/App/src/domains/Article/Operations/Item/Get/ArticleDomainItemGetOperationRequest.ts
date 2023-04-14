import { type ApiRequestWithInput } from '../../../../../data';
import { type ArticleDomainItemGetOperationInput } from './ArticleDomainItemGetOperationInput';

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
