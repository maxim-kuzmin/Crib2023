import {
  type ApiRequestCreationOptions,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type ArticleDomainItemGetOperationInput } from './ArticleDomainItemGetOperationInput';

export interface ArticleDomainItemGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {}

export function createArticleDomainItemGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  options: ApiRequestCreationOptions
): ArticleDomainItemGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
