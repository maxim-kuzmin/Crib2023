import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreLoadCompletedActionCallback
} from '../../../features';

export interface ArticleItemViewProps {
  articleId: number;
  onArticleItemClearActionCompleted?: ArticleItemStoreClearActionCallback;
  onArticleItemLoadActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  topicPageLastUrl?: string;
}
