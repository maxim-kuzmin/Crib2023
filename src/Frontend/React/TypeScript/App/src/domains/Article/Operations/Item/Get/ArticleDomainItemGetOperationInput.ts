import { type ItemGetOperationInput } from '../../../../../common';

export interface ArticleDomainItemGetOperationInput extends ItemGetOperationInput {
  title?: string;
  topicId?: number | string;
}
