import { type PropsWithChildren } from 'react';
import {
  type TableControlPagination,
  type ArticleDomainListGetOperationResponse
} from '../../../all';

export interface ArticleTableViewProps extends PropsWithChildren {
  loading: boolean;
  onTableChangeCallback: (pagination: TableControlPagination) => void;
  pageNumber: number;
  pageSize: number;
  response: ArticleDomainListGetOperationResponse | null;
}
