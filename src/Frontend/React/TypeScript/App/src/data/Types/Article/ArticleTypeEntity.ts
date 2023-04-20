import { createArticleTypeEntityForList, type ArticleTypeEntityForList } from './ArticleTypeEntityForList';

export interface ArticleTypeEntity extends ArticleTypeEntityForList {
  body: string;
}

export function createArticleTypeEntity (options?: Partial<ArticleTypeEntity>): ArticleTypeEntity {
  const entityForList = createArticleTypeEntityForList(options);

  return {
    ...entityForList,
    body: options?.body ?? ''
  };
}
