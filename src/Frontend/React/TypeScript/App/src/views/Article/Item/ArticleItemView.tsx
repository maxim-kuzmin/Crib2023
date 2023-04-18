import React, { memo, useMemo } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type CardControlAction,
  type CardControlExtra,
  CardControlType
} from '../../../common';
import { CardControl } from '../../../controls';
import { ArticlePageMode } from '../../../pages';
import { type ArticleItemViewProps } from './ArticleItemViewProps';
import styles from './ArticleItemView.module.css';

export const ArticleItemView: React.FC<ArticleItemViewProps> = memo(
function ArticleItemView ({
  articleId,
  onArticleItemLoaded,
  topicPageLastUrl
}: ArticleItemViewProps) {
  const { loading, payload } = getModule().getArticleItemViewHooks().useLoadActionOutput({
    articleId,
    onArticleItemLoaded
  });

  const entity = payload?.data?.item.data;

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

      const actionToDelete: CardControlAction = {
        onClick: () => { console.log('MAKC:ArticleItemView:delete', articleId) },
        key: 'delete',
        title: '@@Delete'
      };

      result.push(actionToDelete);

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
        entity
          ? <CardControl
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={loading}
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
