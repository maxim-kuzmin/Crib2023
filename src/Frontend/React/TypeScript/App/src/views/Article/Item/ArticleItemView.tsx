import React, { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import app, {
  type ArticleItemStoreLoadActionPayload
} from '../../../app';
import {
  type CardControlAction,
  type CardControlExtra,
  CardControlType
} from '../../../common';
import { createArticleTypeEntity, type ArticleTypeEntity } from '../../../data';
import { ArticlePageMode } from '../../../pages';
import { type ArticleItemViewProps } from './ArticleItemViewProps';
import styles from './ArticleItemView.module.css';

export const ArticleItemView: React.FC<ArticleItemViewProps> = memo(
function ArticleItemView ({
  articleId,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicPageLastUrl
}: ArticleItemViewProps): React.ReactElement<ArticleItemViewProps> | null {
  const resourceOfArticleItemView = app.hooks.Views.Article.Item.useResource();

  app.hooks.Views.Article.Item.useStoreClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

  const payloadOfLoadAction: ArticleItemStoreLoadActionPayload = useMemo(
    () => {
      const result: ArticleItemStoreLoadActionPayload = {
        id: articleId
      };

      return result;
    },
    [articleId]
  );

  const {
    payloadOfLoadCompletedAction,
    pendingOfLoadAction
  } = app.hooks.Views.Article.Item.useStoreLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    payloadOfLoadAction
  });

  const loadedEntity = payloadOfLoadCompletedAction?.data?.item.data;

  const entity: ArticleTypeEntity = useMemo(
    () => loadedEntity ?? createArticleTypeEntity(),
    [loadedEntity]
  );

  const controlActions: CardControlAction[] = useMemo(
    () => {
      const result: CardControlAction[] = [];

      if (topicPageLastUrl) {
        const actionToBackToList: CardControlAction = {
          href: topicPageLastUrl,
          key: 'backToList',
          title: resourceOfArticleItemView.getActionForBackToList()
        };

        result.push(actionToBackToList);
      }

      const actionToEdit: CardControlAction = {
        href: app.module.Pages.Article.getService().createUrl({ articleId, mode: ArticlePageMode.Edit }),
        key: 'edit',
        title: resourceOfArticleItemView.getActionForEdit()
      };

      result.push(actionToEdit);

      return result;
    },
    [articleId, topicPageLastUrl, resourceOfArticleItemView]
  );

  const tLabelForId: string = resourceOfArticleItemView.getLabelForId();

  const controlExtra: CardControlExtra = {
    title: `${tLabelForId}: ${articleId}`
  };

  const title = resourceOfArticleItemView.getTitle();

  return (
    <div className={styles.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h2>{title}</h2>
      {
        entity.id > 0
          ? <app.control.Card
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={pendingOfLoadAction}
              title={entity.title}
              type={CardControlType.Main}
            >
                { entity.body.split('\n').map((x, i) => <p key={i}>{x}</p>) }
            </app.control.Card>
          : null
      }
    </div>
  )
});
