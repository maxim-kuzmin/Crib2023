import {
  type ApiRequest,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type ArticleDomainItemGetOperationInput } from './ArticleDomainItemGetOperationInput';

export interface ArticleDomainItemGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {}

export function createArticleDomainItemGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  options?: Partial<ApiRequest>
): ArticleDomainItemGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
