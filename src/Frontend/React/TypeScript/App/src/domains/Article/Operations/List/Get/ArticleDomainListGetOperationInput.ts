import { type ListGetOperationInput } from '../../../../../all';

export interface ArticleDomainListGetOperationInput extends ListGetOperationInput {
  ids?: number[];
  title?: string;
  topicId?: number;
  topicIds?: number[];
}
