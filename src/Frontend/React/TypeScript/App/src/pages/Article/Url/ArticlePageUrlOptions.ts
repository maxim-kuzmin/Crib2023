import { type ArticlePageMode } from '../ArticlePageMode';
import { type ArticlePageUrlSearch } from './ArticlePageUrlSearch';

export interface ArticlePageUrlOptions {
  articleId?: number;
  mode?: ArticlePageMode;
  search?: ArticlePageUrlSearch;
}
