import { type ArticleItemViewMode } from '../../../views/Article/Item/ArticleItemViewMode';
import { type ArticlePageUrlSearch } from './ArticlePageUrlSearch';

export interface ArticlePageUrlOptions {
  articleId?: number;
  mode?: ArticleItemViewMode;
  search?: ArticlePageUrlSearch;
}
