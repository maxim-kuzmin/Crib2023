import {
  type ApiOperationResponse,
  type ApiOperationResponseWithData,
  createApiOperationResponseWithData,
} from '../../../../../data';
import { type TopicDomainTreeGetOperationOutput } from './TopicDomainTreeGetOperationOutput';

export interface TopicDomainTreeGetOperationResponse
  extends ApiOperationResponseWithData<TopicDomainTreeGetOperationOutput> {
}

export function createTopicDomainTreeGetOperationResponse (
  options?: ApiOperationResponseWithData<TopicDomainTreeGetOperationOutput> | ApiOperationResponse
): TopicDomainTreeGetOperationResponse {
  return createApiOperationResponseWithData<TopicDomainTreeGetOperationOutput>(options);
}
