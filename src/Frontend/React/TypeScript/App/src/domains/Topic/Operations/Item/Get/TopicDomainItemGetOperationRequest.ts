import { type ApiRequestWithInput } from '../../../../../data';
import { type TopicDomainItemGetOperationInput } from './TopicDomainItemGetOperationInput';

export interface TopicDomainItemGetOperationRequest
  extends ApiRequestWithInput<TopicDomainItemGetOperationInput> {}

export function createTopicDomainItemGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  operationCode: string = ''
): TopicDomainItemGetOperationRequest {
  return {
    operationName: '@@TopicDomainItemGet',
    operationCode,
    input
  };
}
