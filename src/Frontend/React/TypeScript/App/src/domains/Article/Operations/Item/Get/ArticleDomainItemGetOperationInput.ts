import { type ItemGetOperationInputWithNumberId } from '../../../../../all';

export interface ArticleDomainItemGetOperationInput extends ItemGetOperationInputWithNumberId {
  title?: string;
  topicId?: number;
}
