import {
  type ApiRequest,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type ArticleDomainListGetOperationInput } from './ArticleDomainListGetOperationInput';

export interface ArticleDomainListGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainListGetOperationInput> {}

export function createArticleDomainListGetOperationRequest (
  input: ArticleDomainListGetOperationInput,
  options?: Partial<ApiRequest>
): ArticleDomainListGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
