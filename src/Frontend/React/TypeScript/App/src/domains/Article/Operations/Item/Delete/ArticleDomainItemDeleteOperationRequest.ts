import { type ApiRequestWithInput } from '../../../../../data';
import { type ArticleDomainItemGetOperationInput } from '../Get';

export interface ArticleDomainItemDeleteOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {}

export function createArticleDomainItemDeleteOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode: string = ''
): ArticleDomainItemDeleteOperationRequest {
  return {
    operationName: '@@ArticleDomainItemDelete',
    operationCode,
    input
  };
}
