import {
  type ApiRequest,
  type ApiRequestWithInput,
  type TopicTypeEntity,
  createApiRequestWithInput
} from '../../../../../data';

export interface TopicDomainItemSaveOperationRequest extends ApiRequestWithInput<TopicTypeEntity> {}

export function createTopicDomainItemSaveOperationRequest (
  input: TopicTypeEntity,
  options?: Partial<ApiRequest>
): TopicDomainItemSaveOperationRequest {
  return createApiRequestWithInput(input, options);
}
