import {
  type ApiRequest,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type TopicDomainItemGetOperationInput } from '../Get';

export interface TopicDomainItemDeleteOperationRequest
  extends ApiRequestWithInput<TopicDomainItemGetOperationInput> {}

export function createTopicDomainItemDeleteOperationRequest (
  input: TopicDomainItemGetOperationInput,
  options?: Partial<ApiRequest>
): TopicDomainItemDeleteOperationRequest {
  return createApiRequestWithInput(input, options);
}
