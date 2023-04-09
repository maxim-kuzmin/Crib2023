import React, { useMemo, type Key, memo } from 'react';
import {
  TableControl,
  type ArticleDomainEntityForList,
  type ArticleTableViewProps,
  type TableControlColumn,
  type TableControlPagination,
  type BreadcrumbControlItem,
  BreadcrumbControl,
  type ArticleTableViewRow,
  getModule,
  ArticlePageMode
} from '../../../all';
import styles from './ArticleTableView.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function getRowKey (row: any): Key {
  const viewRow: ArticleTableViewRow = row;

  return viewRow.id;
}

export const ArticleTableView: React.FC<ArticleTableViewProps> = memo(function ArticleTableView ({
  loading,
  onTableChangeCallback,
  pageNumber,
  pageSize,
  response
}: ArticleTableViewProps) {
  let items: ArticleDomainEntityForList[];
  let totalCount = 0;

  let controlRows: ArticleTableViewRow[] = [];

  if (response?.data) {
    const { data } = response;

    items = data.items;
    totalCount = data.totalCount;

    if (items.length > 0) {
      controlRows = items.map((item) => {
        const { data, topicPathItems } = item;
        const { id, title } = data;

        return {
          id,
          path: topicPathItems,
          title
        }
      });
    }
  }

  const controlPagination: TableControlPagination = useMemo(() => ({
    pageNumber,
    pageSize,
    totalCount
  }), [pageNumber, pageSize, totalCount]);

  const atriclePageService = getModule().getArticlePageService();

  const controlColumns: TableControlColumn[] = useMemo(() => ([
      {
        field: 'id',
        title: '@@Id'
      },
      {
        field: 'title',
        title: '@@Title',
        render: (row: any) => {
          const viewRow: ArticleTableViewRow = row;

          const { id, title } = viewRow;

          return <Link to={ atriclePageService.createUrl({ articleId: Number(id) })}>{title}</Link>;
        }
      },
      {
        field: 'path',
        title: '@@Path',
        render: (row: any) => {
          const viewRow: ArticleTableViewRow = row;

          const { path } = viewRow;

          const topicPageService = getModule().getTopicPageService();

          const controlItems: BreadcrumbControlItem[] = path.map((item) => {
            const { id, name } = item;

            return {
              href: topicPageService.createUrl({ topicId: Number(id) }),
              key: id,
              title: name
            };
          });

          return (
            <BreadcrumbControl controlItems={controlItems} />
          );
        }
      },
      {
        title: '@@Actions',

        render: (row: any) => {
          const viewRow: ArticleTableViewRow = row;

          const { id } = viewRow;

          return (
            <div className={styles.actions}>
              <Link
                className={styles.action}
                to={atriclePageService.createUrl({ articleId: Number(id) })}
              >
                @@Display
              </Link>
              <Link
                className={styles.action}
                to={atriclePageService.createUrl({ articleId: Number(id), mode: ArticlePageMode.Edit })}
              >
                @@Edit
              </Link>
              <Button>@@Delete</Button>
            </div>
          );
        }
      }
    ]),
    [atriclePageService]
  );

  return (
    <TableControl
      controlColumns={controlColumns}
      controlRows={controlRows}
      controlPagination={controlPagination}
      getRowKeyCallback={getRowKey}
      loading={loading}
      onChangeCallback={onTableChangeCallback}
    />
  )
});
