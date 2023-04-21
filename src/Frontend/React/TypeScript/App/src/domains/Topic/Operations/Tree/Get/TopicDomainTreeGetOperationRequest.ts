import {
  type ApiRequest,
  type ApiRequestWithInput,
  createApiRequestWithInput
} from '../../../../../data';
import { type TopicDomainTreeGetOperationInput } from './TopicDomainTreeGetOperationInput';

export interface TopicDomainTreeGetOperationRequest
  extends ApiRequestWithInput<TopicDomainTreeGetOperationInput> {}

export function createTopicDomainTreeGetOperationRequest (
  input: TopicDomainTreeGetOperationInput,
  options?: Partial<ApiRequest>
): TopicDomainTreeGetOperationRequest {
  return createApiRequestWithInput(input, options);
}
