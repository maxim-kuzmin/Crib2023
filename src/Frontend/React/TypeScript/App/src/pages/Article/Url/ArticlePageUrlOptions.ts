import { type ArticlePageMode, type ArticlePageUrlSearch } from '../../../all';

export interface ArticlePageUrlOptions {
  articleId?: number;
  mode?: ArticlePageMode;
  search?: ArticlePageUrlSearch;
}
