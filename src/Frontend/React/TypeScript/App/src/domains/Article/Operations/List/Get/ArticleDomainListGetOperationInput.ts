import { type ListGetOperationInput, createListGetOperationInput } from '../../../../../common';

export interface ArticleDomainListGetOperationInput extends ListGetOperationInput {
  ids?: number[];
  title?: string;
  topicId?: number;
  topicIds?: number[];
}

export function createArticleDomainListGetOperationInput (
  options?: Partial<ArticleDomainListGetOperationInput>
): ArticleDomainListGetOperationInput {
  const base = createListGetOperationInput(options);

  return {
    ...base,
    ids: options?.ids,
    title: options?.title,
    topicId: options?.topicId,
    topicIds: options?.topicIds,
  };
}
