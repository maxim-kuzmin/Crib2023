import React, { useMemo, type Key, memo } from 'react';
import { Link } from 'react-router-dom';
import { getModule } from '../../../app/ModuleImpl';
import { type BreadcrumbControlItem, type TableControlColumn, type TableControlPagination } from '../../../common';
import { BreadcrumbControl, ButtonControl, TableControl } from '../../../controls';
import { type ArticleDomainEntityForList } from '../../../domains';
import { ArticlePageMode } from '../../../pages';
import { type ArticleTableViewRow } from './ArticleTableViewRow';
import { type ArticleTableViewProps } from './ArticleTableViewProps';
import styles from './ArticleTableView.module.css';
import { type ArticleListStoreLoadActionInput } from '../../../app/Stores';

function getRowKey (row: any): Key {
  const viewRow: ArticleTableViewRow = row;

  return viewRow.id;
}

export const ArticleTableView: React.FC<ArticleTableViewProps> = memo(
function ArticleTableView ({
  onTableChange,
  pageNumber,
  pageSize,
  topicId
}: ArticleTableViewProps) {
  let items: ArticleDomainEntityForList[];
  let totalCount = 0;
  let controlRows: ArticleTableViewRow[] = [];

  const hooksOfArticleItemView = getModule().getArticleItemViewHooks();

  const { dispatchOfDeleteAction } = hooksOfArticleItemView.useDeleteActionOutput();

  const hooksOfArticleTableView = getModule().getArticleTableViewHooks();

  const input: ArticleListStoreLoadActionInput = useMemo(
    () => ({
      pageNumber,
      pageSize,
      topicId
    }),
    [
      pageNumber,
      pageSize,
      topicId
    ]
  );

  const { dispatchOfLoadAction, loading, payload } = hooksOfArticleTableView.useLoadActionOutput(input);

  if (payload?.data) {
    const { data } = payload;

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

  const controlPagination: TableControlPagination = useMemo(
    () => ({
      pageNumber,
      pageSize,
      totalCount
    }),
    [pageNumber, pageSize, totalCount]
  );

  const controlColumns: TableControlColumn[] = useMemo(
    () => {
      const atriclePageService = getModule().getArticlePageService();

      return [
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
                <ButtonControl onClick={() => {
                  dispatchOfDeleteAction.run({ id }).then(() => {
                    dispatchOfLoadAction.run(input)
                  });
                }}>@@Delete</ButtonControl>
              </div>
            );
          }
        }
      ];
    },
    [dispatchOfDeleteAction, dispatchOfLoadAction, input, topicId]
  );

  return (
    <div className={styles.root}>
      <h2>@@Articles</h2>
      <TableControl
        className={styles.root}
        controlColumns={controlColumns}
        controlRows={controlRows}
        controlPagination={controlPagination}
        getRowKey={getRowKey}
        loading={loading}
        onChange={onTableChange}
      />
    </div>
  )
});
