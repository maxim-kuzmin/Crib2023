import { type ApiRequestWithInput } from '../../../../../data';
import { type TopicDomainTreeGetOperationInput } from './TopicDomainTreeGetOperationInput';

export interface TopicDomainTreeGetOperationRequest
  extends ApiRequestWithInput<TopicDomainTreeGetOperationInput> {}

export function createTopicDomainTreeGetOperationRequest (
  input: TopicDomainTreeGetOperationInput,
  operationCode: string = ''
): TopicDomainTreeGetOperationRequest {
  return {
    operationName: '@@TopicDomainTreeGet',
    operationCode,
    input
  };
}
