import React, { useMemo, type Key, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getModule } from '../../../app';
import { type ArticleListStoreLoadActionPayload } from '../../../app/Stores';
import {
  ConfirmControlType,
  type BreadcrumbControlItem,
  type TableControlColumn,
  type TableControlPagination
} from '../../../common';
import { BreadcrumbControl, ButtonControl, TableControl } from '../../../controls';
import { type ArticleDomainEntityForList } from '../../../domains';
import { ArticlePageMode } from '../../../pages';
import { type ArticleTableViewRow } from './ArticleTableViewRow';
import { type ArticleTableViewProps } from './ArticleTableViewProps';
import styles from './ArticleTableView.module.css';
import { useTranslation } from 'react-i18next';

function getRowKey (row: any): Key {
  return (row as ArticleTableViewRow).id;
}

export const ArticleTableView: React.FC<ArticleTableViewProps> = memo(
function ArticleTableView ({
  onTableChange,
  pageNumber,
  pageSize,
  topicId
}: ArticleTableViewProps) {
  const { t } = useTranslation('views/Article/Table/ArticleTableView');

  const tArticles: string = t('@@Articles');
  const tActions: string = t('@@Actions');
  const tDelete: string = t('@@Delete');
  const tDisplay: string = t('@@Display');
  const tEdit: string = t('@@Edit');
  const tId: string = t('@@Id');
  const tNew: string = t('@@New');
  const tPath: string = t('@@Path');
  const tTitle: string = t('@@Title');

  let items: ArticleDomainEntityForList[];
  let totalCount = 0;
  let controlRows: ArticleTableViewRow[] = [];

  const deletingId = useRef(0);

  const hooksOfArticleItemView = getModule().getArticleItemViewHooks();

  const {
    dispatchOfDeleteAction,
    pendingOfDeleteAction
  } = hooksOfArticleItemView.useDeleteActionOutput();

  const hooksOfArticleTableView = getModule().getArticleTableViewHooks();

  const payloadOfLoadAction: ArticleListStoreLoadActionPayload = useMemo(
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

  const {
    dispatchOfLoadAction,
    payloadOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooksOfArticleTableView.useLoadActionOutput({
    payloadOfLoadAction
  });

  if (payloadOfLoadCompletedAction?.data) {
    const { data } = payloadOfLoadCompletedAction;

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
    [
      pageNumber,
      pageSize,
      totalCount
    ]
  );

  const controlColumns: TableControlColumn[] = useMemo(
    () => {
      const atriclePageService = getModule().getArticlePageService();

      return [
        {
          field: 'id',
          header: { title: tId }
        },
        {
          field: 'title',
          header: { title: tTitle },
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
          header: { title: tPath },
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
            title: tActions,
            render: (title?: string) => {
              return (
                <div className={styles.actions}>
                  <span className={styles.action}>{title}</span>
                  {
                    topicId > 0
                      ? <Link to={atriclePageService.createUrl({ search: { topicId } })}>{tNew}</Link>
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
                  {tDisplay}
                </Link>
                <Link
                  className={styles.action}
                  to={atriclePageService.createUrl({ articleId: Number(id), mode: ArticlePageMode.Edit })}
                >
                  {tEdit}
                </Link>
                <ButtonControl
                  disabled={id !== deletingId.current && pendingOfDeleteAction}
                  loading={id === deletingId.current && pendingOfDeleteAction}
                  onClick={
                    () => {
                      deletingId.current = id;

                      getModule().getConfirmControlComponent().show({
                        onOk: () => {
                          dispatchOfDeleteAction.run({ id })
                          .then(() => {
                            deletingId.current = 0;
                            dispatchOfLoadAction.run(payloadOfLoadAction);
                          });
                        },
                        type: ConfirmControlType.Delete
                      });
                  }}
                  title={`${tDelete} ${id}`}
                >
                  {tDelete}
                </ButtonControl>
              </div>
            );
          }
        }
      ];
    },
    [
      dispatchOfDeleteAction,
      dispatchOfLoadAction,
      payloadOfLoadAction,
      pendingOfDeleteAction,
      tActions,
      tDelete,
      tDisplay,
      tEdit,
      tId,
      tNew,
      tPath,
      tTitle,
      topicId
    ]
  );

  return (
    <div className={styles.root}>
      <h2>{tArticles}</h2>
      <TableControl
        className={styles.root}
        controlColumns={controlColumns}
        controlRows={controlRows}
        controlPagination={controlPagination}
        getRowKey={getRowKey}
        loading={pendingOfLoadAction}
        onChange={onTableChange}
      />
    </div>
  )
});
