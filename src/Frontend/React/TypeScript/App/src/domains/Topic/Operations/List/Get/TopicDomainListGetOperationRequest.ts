import {
  createApiRequestWithInput,
  type ApiRequestCreationOptions,
  type ApiRequestWithInput
} from '../../../../../data';
import { type TopicDomainListGetOperationInput } from './TopicDomainListGetOperationInput';

export interface TopicDomainListGetOperationRequest
  extends ApiRequestWithInput<TopicDomainListGetOperationInput> {}

export function createTopicDomainListGetOperationRequest (
  input: TopicDomainListGetOperationInput,
  options: ApiRequestCreationOptions
): TopicDomainListGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
