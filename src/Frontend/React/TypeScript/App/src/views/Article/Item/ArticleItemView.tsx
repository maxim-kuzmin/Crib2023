import React, { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppInstance } from '../../../app';
import {
  type CardControlAction,
  type CardControlExtra,
  CardControlType
} from '../../../common';
import { createArticleTypeEntity, type ArticleTypeEntity } from '../../../data';
import { type ArticleItemStoreLoadActionResult } from '../../../features';
import { type ArticleItemViewProps } from './ArticleItemViewProps';
import styles from './ArticleItemView.module.css';

export const ArticleItemView: React.FC<ArticleItemViewProps> = memo(
function ArticleItemView ({
  articleId,
  articleEditPageUrl,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicPageLastUrl
}: ArticleItemViewProps): React.ReactElement<ArticleItemViewProps> | null {
  const { controls, hooks } = useAppInstance();

  const resourceOfArticleItemView = hooks.Views.Article.Item.useResource();

  hooks.Views.Article.Item.useStoreClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

  const resultOfLoadAction: ArticleItemStoreLoadActionResult = useMemo(
    () => {
      const result: ArticleItemStoreLoadActionResult = {
        id: articleId
      };

      return result;
    },
    [articleId]
  );

  const {
    resultOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooks.Views.Article.Item.useStoreLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    resultOfLoadAction
  });

  const loadedEntity = resultOfLoadCompletedAction?.data?.item.data;

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
        href: articleEditPageUrl,
        key: 'edit',
        title: resourceOfArticleItemView.getActionForEdit()
      };

      result.push(actionToEdit);

      return result;
    },
    [
      articleEditPageUrl,
      resourceOfArticleItemView,
      topicPageLastUrl
    ]
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
          ? <controls.Card
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={pendingOfLoadAction}
              title={entity.title}
              type={CardControlType.Main}
            >
              { entity.body.split('\n').map((x, i) => <p key={i}>{x}</p>) }
            </controls.Card>
          : null
      }
    </div>
  )
});
