import {
  type ApiRequest,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type TopicDomainItemGetOperationInput } from './TopicDomainItemGetOperationInput';

export interface TopicDomainItemGetOperationRequest
  extends ApiRequestWithInput<TopicDomainItemGetOperationInput> {}

export function createTopicDomainItemGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  options?: Partial<ApiRequest>
): TopicDomainItemGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
