import { type PropsWithChildren } from 'react';
import { type TableControlPagination } from '../../../common';

export interface ArticleTableViewProps extends PropsWithChildren {
  onTableChange: (pagination: TableControlPagination) => void;
  pageNumber: number;
  pageSize: number;
  topicId: number;
}
