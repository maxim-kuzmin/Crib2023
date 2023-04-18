import { type PropsWithChildren } from 'react';
import { type ArticleItemStoreSetActionPayload } from '../../../app/Stores';

export interface ArticleItemViewProps extends PropsWithChildren {
  articleId: number;
  onArticleItemLoaded: (payload: ArticleItemStoreSetActionPayload) => void;
  topicPageLastUrl?: string;
}
