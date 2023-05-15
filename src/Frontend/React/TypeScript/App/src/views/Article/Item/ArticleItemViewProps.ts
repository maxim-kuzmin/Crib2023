import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreLoadCompletedActionCallback
} from '../../../features';

export interface ArticleItemViewProps {
  articleId: number;
  articleEditPageUrl: string;
  onArticleItemClearActionCompleted?: ArticleItemStoreClearActionCallback;
  onArticleItemLoadActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  topicPageLastUrl?: string;
}
