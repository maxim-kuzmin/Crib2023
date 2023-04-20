export interface ArticleTypeEntityForList {
  id: number;
  rowGuid: string;
  title: string;
  topicId: number;
}

export function createArticleTypeEntityForList (options?: Partial<ArticleTypeEntityForList>): ArticleTypeEntityForList {
  return {
    id: options?.id ?? 0,
    rowGuid: options?.rowGuid ?? '',
    title: options?.title ?? '',
    topicId: options?.topicId ?? 0
  };
}
