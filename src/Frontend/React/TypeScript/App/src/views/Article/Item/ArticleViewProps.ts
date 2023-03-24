import { type PropsWithChildren } from 'react';
import { type ArticleDomainItemGetOperationResponse } from '../../../all';

export interface ArticleViewProps extends PropsWithChildren {
  response: ArticleDomainItemGetOperationResponse | null;
}
