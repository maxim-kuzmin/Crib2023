import { type TableControlPagination } from '../../../common';

export interface ArticleTableViewProps {
  createArticlePageUrl: (articleId: number) => string;
  createArticleEditPageUrl: (articleId: number) => string;
  createArticleNewPageUrl: (topicId: number) => string;
  createTopicPageUrl: (topicId: number) => string;
  onTableChange: (pagination: TableControlPagination) => void;
  pageNumber: number;
  pageSize: number;
  topicId: number;
}
