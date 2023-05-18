import {
  type ApiOperationResponse,
  type ApiOperationResponseWithData,
  createApiOperationResponseWithData,
} from '../../../../../data';
import { type TopicDomainListGetOperationOutput } from './TopicDomainListGetOperationOutput';

export interface TopicDomainListGetOperationResponse
  extends ApiOperationResponseWithData<TopicDomainListGetOperationOutput> {
}

export function createTopicDomainListGetOperationResponse (
  options?: ApiOperationResponseWithData<TopicDomainListGetOperationOutput> | ApiOperationResponse
): TopicDomainListGetOperationResponse {
  return createApiOperationResponseWithData<TopicDomainListGetOperationOutput>(options);
}
