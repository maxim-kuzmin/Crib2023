import { type PropsWithChildren } from 'react';
import { type ArticleDomainItemGetOperationResponse } from '../../../domains';

export interface ArticleItemViewProps extends PropsWithChildren {
  loading: boolean;
  response: ArticleDomainItemGetOperationResponse | null;
  topicPageLastUrl?: string;
}
