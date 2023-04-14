import { type ApiRequestWithInput } from '../../../../../data';
import { type TopicDomainListGetOperationInput } from './TopicDomainListGetOperationInput';

export interface TopicDomainListGetOperationRequest
  extends ApiRequestWithInput<TopicDomainListGetOperationInput> {}

export function createTopicDomainListGetOperationRequest (
  input: TopicDomainListGetOperationInput,
  operationCode: string = ''
): TopicDomainListGetOperationRequest {
  return {
    operationName: '@@TopicDomainListGet',
    operationCode,
    input
  };
}
