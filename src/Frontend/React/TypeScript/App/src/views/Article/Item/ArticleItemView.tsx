import React, { memo, useMemo } from 'react';
import {
  type ArticleTypeEntity,
  type ArticleDomainEntityForItem,
  type ArticleItemViewProps,
  CardControl,
  type CardControlAction,
  type CardControlExtra,
  getModule,
  ArticlePageMode
} from '../../../all';
import styles from './ArticleItemView.module.css';

export const ArticleItemView: React.FC<ArticleItemViewProps> = memo(function ArticleItemView ({
  loading,
  response
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

  const articlePageService = getModule().getArticlePageService();

  const controlActions: CardControlAction[] = useMemo(() => ([
    {
      href: articlePageService.createUrl({ articleId: id, mode: ArticlePageMode.Edit }),
      key: 'edit',
      title: '@@Edit'
    },
    {
      onClickCallback: () => { console.log('MAKC:ArticleItemView:delete', id) },
      key: 'delete',
      title: '@@Delete'
    }
  ]), [id, articlePageService]);

  const controlExtra: CardControlExtra = {
    title: `ID: ${id}`
  };

  return (
    <div className={styles.root}>
      {
        data
          ? <CardControl
              controlActions={controlActions}
              controlExtra={controlExtra}
              loading={loading}
              title={data.title}
            >
                { data.body.split('\n').map((x, i) => <p key={i}>{x}</p>) }
            </CardControl>
          : null
      }
    </div>
  )
});
