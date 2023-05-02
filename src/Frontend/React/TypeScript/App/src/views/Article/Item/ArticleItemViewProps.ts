import { type PropsWithChildren } from 'react';
import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreLoadCompletedActionCallback
} from '../../../features';

export interface ArticleItemViewProps extends PropsWithChildren {
  articleId: number;
  onArticleItemClearActionCompleted?: ArticleItemStoreClearActionCallback;
  onArticleItemLoadActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  topicPageLastUrl?: string;
}
