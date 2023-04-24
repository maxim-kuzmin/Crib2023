import {
  type ApiRequestCreationOptions,
  type ApiRequestWithInput,
  type TopicTypeEntity,
  createApiRequestWithInput
} from '../../../../../data';

export interface TopicDomainItemSaveOperationRequest extends ApiRequestWithInput<TopicTypeEntity> {}

export function createTopicDomainItemSaveOperationRequest (
  input: TopicTypeEntity,
  options: ApiRequestCreationOptions
): TopicDomainItemSaveOperationRequest {
  return createApiRequestWithInput(input, options);
}
