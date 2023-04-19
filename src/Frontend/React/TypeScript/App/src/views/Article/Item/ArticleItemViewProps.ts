import { type PropsWithChildren } from 'react';
import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreLoadCompletedActionCallback
} from '../../../app/Stores';

export interface ArticleItemViewProps extends PropsWithChildren {
  articleId: number;
  onArticleItemClearActionCompleted?: ArticleItemStoreClearActionCallback;
  onArticleItemLoadActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  topicPageLastUrl?: string;
}
