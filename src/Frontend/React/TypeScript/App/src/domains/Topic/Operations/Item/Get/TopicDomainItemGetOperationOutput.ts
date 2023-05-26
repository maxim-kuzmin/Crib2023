import { type ItemGetOperationOutput, createItemGetOperationOutput } from '../../../../../common';
import { type TopicDomainEntityForItem } from '../../../Entities';

export interface TopicDomainItemGetOperationOutput extends ItemGetOperationOutput<TopicDomainEntityForItem> {}

export function createTopicDomainItemGetOperationOutput (
  options: TopicDomainItemGetOperationOutput
): TopicDomainItemGetOperationOutput {
  return createItemGetOperationOutput(options);
}
