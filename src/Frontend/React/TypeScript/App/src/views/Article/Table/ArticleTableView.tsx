import React, { useMemo, type Key, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppInstance } from '../../../app';
import {
  ConfirmControlType,
  type BreadcrumbControlItem,
  type TableControlColumn,
  type TableControlPagination
} from '../../../common';
import { type ArticleDomainEntityForList } from '../../../domains';
import { type ArticleListStoreLoadActionResult } from '../../../features';
import { type ArticleTableViewRow } from './ArticleTableViewRow';
import { type ArticleTableViewProps } from './ArticleTableViewProps';
import styles from './ArticleTableView.module.css';

function getRowKey (row: any): Key {
  return (row as ArticleTableViewRow).id;
}

export const ArticleTableView: React.FC<ArticleTableViewProps> = memo(
function ArticleTableView ({
  createArticlePageUrl,
  createArticleEditPageUrl,
  createArticleNewPageUrl,
  createTopicPageUrl,
  onTableChange,
  pageNumber,
  pageSize,
  topicId
}: ArticleTableViewProps): React.ReactElement<ArticleTableViewProps> | null {
  let items: ArticleDomainEntityForList[];
  let totalCount = 0;
  let controlRows: ArticleTableViewRow[] = [];

  const deletingIdRef = useRef(0);

  const { components, controls, hooks } = useAppInstance();

  const resourceOfConfirmControl = hooks.Controls.Confirm.useResource();

  const {
    dispatchOfDeleteAction,
    pendingOfDeleteAction
  } = hooks.Views.Article.Item.useStoreDeleteActionOutput();

  const resourceOfArticleTableView = hooks.Views.Article.Table.useResource();

  const resultOfLoadAction: ArticleListStoreLoadActionResult = useMemo(
    () => {
      const result: ArticleListStoreLoadActionResult = {
        pageNumber,
        pageSize,
        topicId
      };

      return result;
    },
    [
      pageNumber,
      pageSize,
      topicId
    ]
  );

  const {
    dispatchOfLoadAction,
    resultOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooks.Views.Article.Table.useStoreLoadActionOutput({
    resultOfLoadAction
  });

  if (resultOfLoadCompletedAction?.data) {
    const { data } = resultOfLoadCompletedAction;

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

  const controlPagination = useMemo<TableControlPagination>(
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

  const componentOfConfirmControl = components.Controls.Confirm;

  const controlColumns: TableControlColumn[] = useMemo(
    () => {
      return [
        {
          field: 'id',
          header: { title: resourceOfArticleTableView.getLabelForId() }
        },
        {
          field: 'title',
          header: { title: resourceOfArticleTableView.getLabelForTitle() },
          render: (row: any) => {
            const viewRow: ArticleTableViewRow = row;

            const { id, title } = viewRow;

            return (
              <Link to={ createArticlePageUrl(Number(id))}>{title}</Link>
            );
          }
        },
        {
          field: 'path',
          header: { title: resourceOfArticleTableView.getLabelForPath() },
          render: (row: any) => {
            const viewRow: ArticleTableViewRow = row;

            const { path } = viewRow;

            const controlItems: BreadcrumbControlItem[] = path.map((item) => {
              const { id, name } = item;

              return {
                href: createTopicPageUrl(Number(id)),
                key: id,
                title: name
              };
            });

            return (
              <controls.Breadcrumb controlItems={controlItems} />
            );
          }
        },
        {
          header: {
            title: resourceOfArticleTableView.getLabelForActions(),
            render: (title?: string) => {
              return (
                <div className={styles.actions}>
                  <span className={styles.action}>{title}</span>
                  {
                    topicId > 0
                      ? <Link
                          to={createArticleNewPageUrl(topicId)}
                        >
                          {resourceOfArticleTableView.getActionForNew()}
                        </Link>
                      : null
                  }
                </div>
              );
            }
          },
          render: (row: any) => {
            const viewRow: ArticleTableViewRow = row;

            const { id } = viewRow;

            const tActionForDelete: string = resourceOfArticleTableView.getActionForDelete();

            return (
              <div className={styles.actions}>
                <Link
                  className={styles.action}
                  to={createArticlePageUrl(Number(id))}
                >
                  {resourceOfArticleTableView.getActionForDisplay()}
                </Link>
                <Link
                  className={styles.action}
                  to={createArticleEditPageUrl(Number(id))}
                >
                  {resourceOfArticleTableView.getActionForEdit()}
                </Link>
                <controls.Button
                  disabled={id !== deletingIdRef.current && pendingOfDeleteAction}
                  loading={id === deletingIdRef.current && pendingOfDeleteAction}
                  onClick={
                    () => {
                      deletingIdRef.current = id;

                      componentOfConfirmControl.show({
                        resourceOfConfirmControl,
                        onOk: () => {
                          dispatchOfDeleteAction.run({ id })
                          .then(() => {
                            deletingIdRef.current = 0;
                            dispatchOfLoadAction.run(resultOfLoadAction);
                          });
                        },
                        type: ConfirmControlType.Delete
                      });
                  }}
                  title={`${tActionForDelete} ${id}`}
                >
                  {resourceOfArticleTableView.getActionForDelete()}
                </controls.Button>
              </div>
            );
          }
        }
      ];
    },
    [
      componentOfConfirmControl,
      controls,
      createArticleEditPageUrl,
      createArticleNewPageUrl,
      createArticlePageUrl,
      createTopicPageUrl,
      dispatchOfDeleteAction,
      dispatchOfLoadAction,
      resultOfLoadAction,
      pendingOfDeleteAction,
      resourceOfArticleTableView,
      resourceOfConfirmControl,
      topicId
    ]
  );

  const title = resourceOfArticleTableView.getTitle();

  return (
    <div className={styles.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h2>{title}</h2>
      <controls.Table
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
