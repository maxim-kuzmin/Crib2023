import { type PropsWithChildren } from 'react';
import {
  type TableControlPagination,
  type ArticleDomainListGetOperationResponse
} from '../../../all';

export interface ArticleTableViewProps extends PropsWithChildren {
  loading: boolean;
  onTableChange: (pagination: TableControlPagination) => void;
  pageNumber: number;
  pageSize: number;
  response: ArticleDomainListGetOperationResponse | null;
  topicId: number;
}
