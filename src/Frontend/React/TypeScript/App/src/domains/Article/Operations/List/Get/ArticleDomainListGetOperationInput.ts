import { type ListGetOperationInput } from '../../../../../common';

export interface ArticleDomainListGetOperationInput extends ListGetOperationInput {
  ids?: number[];
  title?: string;
  topicId?: number;
  topicIds?: number[];
}
