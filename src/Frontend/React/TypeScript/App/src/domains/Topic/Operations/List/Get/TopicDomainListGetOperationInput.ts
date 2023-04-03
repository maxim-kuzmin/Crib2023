import { type TopicDomainTreeGetOperationInput } from '../../../../../all';

export interface TopicDomainListGetOperationInput extends TopicDomainTreeGetOperationInput {
  ids?: number[];
  idsString?: string;
  name?: string;
}
