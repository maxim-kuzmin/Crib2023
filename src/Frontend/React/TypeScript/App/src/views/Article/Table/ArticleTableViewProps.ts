import { type TableControlPagination } from '../../../common';

export interface ArticleTableViewProps {
  onTableChange: (pagination: TableControlPagination) => void;
  pageNumber: number;
  pageSize: number;
  topicId: number;
}
