import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreLoadCompletedActionCallback
} from '../../../../features';

export interface ArticleItemEditViewProps {
  articleId: number;
  articlePageUrl: string;
  onArticleItemClearActionCompleted?: ArticleItemStoreClearActionCallback;
  onArticleItemLoadActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  topicId: number;
  topicPageLastUrl?: string;
}
