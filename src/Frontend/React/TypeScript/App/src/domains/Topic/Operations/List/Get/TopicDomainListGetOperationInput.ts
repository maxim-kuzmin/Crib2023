import { type TopicDomainTreeGetOperationInput, createTopicDomainTreeGetOperationInput } from '../../Tree';

export interface TopicDomainListGetOperationInput extends TopicDomainTreeGetOperationInput {
  ids?: number[];
  idsString?: string;
  name?: string;
}

export function createTopicDomainListGetOperationInput (
  options?: Partial<TopicDomainListGetOperationInput>
): TopicDomainListGetOperationInput {
  const base = createTopicDomainTreeGetOperationInput(options);

  return {
    ...base,
    ids: options?.ids,
    idsString: options?.idsString,
    name: options?.name,
  };
}
