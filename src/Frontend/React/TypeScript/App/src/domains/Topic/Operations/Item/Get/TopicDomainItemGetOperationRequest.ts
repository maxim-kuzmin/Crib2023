import {
  type ApiRequestCreationOptions,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type TopicDomainItemGetOperationInput } from './TopicDomainItemGetOperationInput';

export interface TopicDomainItemGetOperationRequest
  extends ApiRequestWithInput<TopicDomainItemGetOperationInput> {}

export function createTopicDomainItemGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  options: ApiRequestCreationOptions
): TopicDomainItemGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
