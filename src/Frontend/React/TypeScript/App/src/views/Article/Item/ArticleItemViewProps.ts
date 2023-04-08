import { type PropsWithChildren } from 'react';
import { type ArticleDomainItemGetOperationResponse } from '../../../all';

export interface ArticleItemViewProps extends PropsWithChildren {
  loading: boolean;
  response: ArticleDomainItemGetOperationResponse | null;
}
