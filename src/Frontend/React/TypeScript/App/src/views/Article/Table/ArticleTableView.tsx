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
import { type ArticleListStoreLoadActionPayload } from '../../../features';
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

  const deletingId = useRef(0);

  const { components, controls, hooks } = useAppInstance();

  const resourceOfConfirmControl = hooks.Controls.Confirm.useResource();

  const {
    dispatchOfDeleteAction,
    pendingOfDeleteAction
  } = hooks.Views.Article.Item.useStoreDeleteActionOutput();

  const resourceOfArticleTableView = hooks.Views.Article.Table.useResource();

  const payloadOfLoadAction: ArticleListStoreLoadActionPayload = useMemo(
    () => {
      const result: ArticleListStoreLoadActionPayload = {
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
    payloadOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooks.Views.Article.Table.useStoreLoadActionOutput({
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
    () => {
      const result: TableControlPagination = {
        pageNumber,
        pageSize,
        totalCount
      };

      return result;
    },
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
                  disabled={id !== deletingId.current && pendingOfDeleteAction}
                  loading={id === deletingId.current && pendingOfDeleteAction}
                  onClick={
                    () => {
                      deletingId.current = id;

                      componentOfConfirmControl.show({
                        resourceOfConfirmControl,
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
      payloadOfLoadAction,
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
