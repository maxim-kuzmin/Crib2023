import {
  type ApiRequestCreationOptions,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type ArticleDomainListGetOperationInput } from './ArticleDomainListGetOperationInput';

export interface ArticleDomainListGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainListGetOperationInput> {}

export function createArticleDomainListGetOperationRequest (
  input: ArticleDomainListGetOperationInput,
  options: ApiRequestCreationOptions
): ArticleDomainListGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
