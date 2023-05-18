import {
  type ApiOperationResponse,
  type ApiOperationResponseWithData,
  createApiOperationResponseWithData,
} from '../../../../../data';
import { type TopicDomainItemGetOperationOutput } from './TopicDomainItemGetOperationOutput';

export interface TopicDomainItemGetOperationResponse
  extends ApiOperationResponseWithData<TopicDomainItemGetOperationOutput> {
}

export function createTopicDomainItemGetOperationResponse (
  options?: ApiOperationResponseWithData<TopicDomainItemGetOperationOutput> | ApiOperationResponse
): TopicDomainItemGetOperationResponse {
  return createApiOperationResponseWithData<TopicDomainItemGetOperationOutput>(options);
}
