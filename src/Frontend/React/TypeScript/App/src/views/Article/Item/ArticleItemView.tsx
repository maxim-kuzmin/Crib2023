import React, { memo, useMemo } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { type ArticleItemStoreLoadActionPayload } from '../../../app/Stores';
import {
  type CardControlAction,
  type CardControlExtra,
  CardControlType
} from '../../../common';
import { CardControl } from '../../../controls';
import { ArticlePageMode } from '../../../pages';
import { type ArticleItemViewProps } from './ArticleItemViewProps';
import styles from './ArticleItemView.module.css';
import { createArticleTypeEntity, type ArticleTypeEntity } from '../../../data';

export const ArticleItemView: React.FC<ArticleItemViewProps> = memo(
function ArticleItemView ({
  articleId,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicPageLastUrl
}: ArticleItemViewProps) {
  const hooksOfArticleItemView = getModule().getArticleItemViewHooks();

  hooksOfArticleItemView.useClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

  const payloadOfLoadAction: ArticleItemStoreLoadActionPayload = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  const { payloadOfLoadCompletedAction, pendingOfLoadAction } = hooksOfArticleItemView.useLoadActionOutput({
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
          key: 'goToList',
          title: '@@BackToList'
        };

        result.push(actionToBackToList);
      }

      const actionToEdit: CardControlAction = {
        href: getModule().getArticlePageService().createUrl({ articleId, mode: ArticlePageMode.Edit }),
        key: 'edit',
        title: '@@Edit'
      };

      result.push(actionToEdit);

      return result;
    },
    [articleId, topicPageLastUrl]
  );

  const controlExtra: CardControlExtra = {
    title: `@@ID: ${articleId}`
  };

  return (
    <div className={styles.root}>
      <h2>@@Article</h2>
      {
        entity.id > 0
          ? <CardControl
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={pendingOfLoadAction}
              title={entity.title}
              type={CardControlType.Main}
            >
                { entity.body.split('\n').map((x, i) => <p key={i}>{x}</p>) }
            </CardControl>
          : null
      }
    </div>
  )
});
