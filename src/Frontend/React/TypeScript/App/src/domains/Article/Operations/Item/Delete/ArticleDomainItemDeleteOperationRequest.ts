import {
  type ApiRequest,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type ArticleDomainItemGetOperationInput } from '../Get';

export interface ArticleDomainItemDeleteOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {}

export function createArticleDomainItemDeleteOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  options?: Partial<ApiRequest>
): ArticleDomainItemDeleteOperationRequest {
  return createApiRequestWithInput(input, options);
}
