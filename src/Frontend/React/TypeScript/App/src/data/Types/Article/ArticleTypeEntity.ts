import { createArticleTypeEntityForList, type ArticleTypeEntityForList } from './ArticleTypeEntityForList';

export interface ArticleTypeEntity extends ArticleTypeEntityForList {
  body: string;
}

export function createArticleTypeEntity (options?: Partial<ArticleTypeEntity>): ArticleTypeEntity {
  const base = createArticleTypeEntityForList(options);

  return {
    ...base,
    body: options?.body ?? ''
  };
}
