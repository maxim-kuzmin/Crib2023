import { type ItemGetOperationInput, createItemGetOperationInput } from '../../../../../common';

export interface ArticleDomainItemGetOperationInput extends ItemGetOperationInput {
  title?: string;
  topicId?: number | string;
}

export function createArticleDomainItemGetOperationInput (
  options?: Partial<ArticleDomainItemGetOperationInput>
): ArticleDomainItemGetOperationInput {
  const base = createItemGetOperationInput(options);

  return {
    ...base,
    title: options?.title,
    topicId: options?.topicId,
  };
}
