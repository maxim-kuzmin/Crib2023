import { type TreeGetOperationOutput, createTreeGetOperationOutput } from '../../../../../common';
import { type TopicDomainEntityForTree } from '../../../Entities';

export interface TopicDomainTreeGetOperationOutput extends TreeGetOperationOutput<TopicDomainEntityForTree> {}

export function createTopicDomainTreeGetOperationOutput (
  options: TopicDomainTreeGetOperationOutput
): TopicDomainTreeGetOperationOutput {
  return createTreeGetOperationOutput(options);
}
