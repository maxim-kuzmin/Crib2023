import {
  type ApiRequestWithInput,
  type TopicDomainTreeGetOperationInput
} from '../../../../../all';

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
