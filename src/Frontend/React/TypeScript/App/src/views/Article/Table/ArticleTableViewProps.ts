import { type PropsWithChildren } from 'react';
import { type ArticleDomainListGetOperationResponse } from '../../../all';

export interface ArticleTableViewProps extends PropsWithChildren {
  response: ArticleDomainListGetOperationResponse | null;
}
