import { type ArticlePageUrlOptions } from '../../../all';

export interface ArticlePageService {
  createUrl: (options?: ArticlePageUrlOptions) => string;
}
