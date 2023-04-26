import React, { memo, useMemo } from 'react';
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
}: ArticleItemViewProps) {
  const hooksOfArticleItemView = app.module.getArticleItemViewHooks();

  const resourceOfArticleItemView = hooksOfArticleItemView.useResource();

  hooksOfArticleItemView.useStoreClearActionOutput({
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
  } = hooksOfArticleItemView.useStoreLoadActionOutput({
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
        href: app.module.getArticlePageService().createUrl({ articleId, mode: ArticlePageMode.Edit }),
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

  return (
    <div className={styles.root}>
      <h2>{resourceOfArticleItemView.getTitle()}</h2>
      {
        entity.id > 0
          ? <app.controls.Card
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={pendingOfLoadAction}
              title={entity.title}
              type={CardControlType.Main}
            >
                { entity.body.split('\n').map((x, i) => <p key={i}>{x}</p>) }
            </app.controls.Card>
          : null
      }
    </div>
  )
});
