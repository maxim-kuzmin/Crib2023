import { type ListGetOperationOutput, createListGetOperationOutput } from '../../../../../common';
import { type TopicDomainEntityForList } from '../../../Entities';

export interface TopicDomainListGetOperationOutput extends ListGetOperationOutput<TopicDomainEntityForList> {}

export function createTopicDomainListGetOperationOutput (
  options?: Partial<TopicDomainListGetOperationOutput>
): TopicDomainListGetOperationOutput {
  return createListGetOperationOutput(options);
}
