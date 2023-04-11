import React, { memo, useMemo } from 'react';
import {
  type ArticleTypeEntity,
  type ArticleDomainEntityForItem,
  type ArticleItemViewProps,
  CardControl,
  type CardControlAction,
  type CardControlExtra,
  getModule,
  ArticlePageMode,
  CardControlType
} from '../../../all';
import styles from './ArticleItemView.module.css';

export const ArticleItemView: React.FC<ArticleItemViewProps> = memo(
    function ArticleItemView ({
      loading,
      response,
      topicPageLastUrl
    }: ArticleItemViewProps) {
  let item: ArticleDomainEntityForItem | null = null;
  let data: ArticleTypeEntity | null = null;

  if (response?.data) {
    item = response.data.item;
    if (item) {
      data = item.data;
    }
  }

  const id = data?.id ?? 0;

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
        href: getModule().getArticlePageService().createUrl({ articleId: id, mode: ArticlePageMode.Edit }),
        key: 'edit',
        title: '@@Edit'
      };

      result.push(actionToEdit);

      const actionToDelete: CardControlAction = {
        onClick: () => { console.log('MAKC:ArticleItemView:delete', id) },
        key: 'delete',
        title: '@@Delete'
      };

      result.push(actionToDelete);

      return result;
    },
    [id, topicPageLastUrl]
  );

  const controlExtra: CardControlExtra = {
    title: `@@ID: ${id}`
  };

  return (
    <div className={styles.root}>
      <h2>@@Article</h2>
      {
        data
          ? <CardControl
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={loading}
              title={data.title}
              type={CardControlType.Main}
            >
                { data.body.split('\n').map((x, i) => <p key={i}>{x}</p>) }
            </CardControl>
          : null
      }
    </div>
  )
});
