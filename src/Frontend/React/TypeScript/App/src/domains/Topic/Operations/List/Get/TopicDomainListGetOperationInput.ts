import { type TopicDomainTreeGetOperationInput } from '../../Tree';

export interface TopicDomainListGetOperationInput extends TopicDomainTreeGetOperationInput {
  ids?: number[];
  idsString?: string;
  name?: string;
}
