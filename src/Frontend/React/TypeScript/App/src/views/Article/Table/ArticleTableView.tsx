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
  ArticlePageMode,
  ButtonControl
} from '../../../all';
import styles from './ArticleTableView.module.css';
import { Link } from 'react-router-dom';

function getRowKey (row: any): Key {
  const viewRow: ArticleTableViewRow = row;

  return viewRow.id;
}

export const ArticleTableView: React.FC<ArticleTableViewProps> = memo(function ArticleTableView ({
  loading,
  onTableChangeCallback,
  pageNumber,
  pageSize,
  response,
  topicId
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
        header: { title: '@@Id' }
      },
      {
        field: 'title',
        header: { title: '@@Title' },
        render: (row: any) => {
          const viewRow: ArticleTableViewRow = row;

          const { id, title } = viewRow;

          return (
            <Link to={ atriclePageService.createUrl({ articleId: Number(id) })}>{title}</Link>
          );
        }
      },
      {
        field: 'path',
        header: { title: '@@Path' },
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
        header: {
          title: '@@Actions',
          render: (title?: string) => {
            return (
              <div className={styles.actions}>
                <span className={styles.action}>{title}</span>
                {
                  topicId > 0
                    ? <Link to={atriclePageService.createUrl({ search: { topicId } })}>@@New</Link>
                    : null
                }
              </div>
            );
          }
        },
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
              <ButtonControl>@@Delete</ButtonControl>
            </div>
          );
        }
      }
    ]),
    [atriclePageService, topicId]
  );

  return (
    <TableControl
      className={styles.root}
      controlColumns={controlColumns}
      controlRows={controlRows}
      controlPagination={controlPagination}
      getRowKeyCallback={getRowKey}
      loading={loading}
      onChangeCallback={onTableChangeCallback}
    />
  )
});
