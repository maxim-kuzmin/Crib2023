import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getModule } from '../../app';
import { type ArticlePageProps } from './ArticlePageProps';
import { type TopicItemStoreLoadActionPayload, type ArticleItemStoreSetActionPayload } from '../../app/Stores';
import { ArticleItemEditView, ArticleItemView } from '../../views';
import { ArticlePageMode } from './ArticlePageMode';
import { TreeGetOperationAxisForItem } from '../../common';

export const ArticlePage: React.FC<ArticlePageProps> = memo(
function ArticlePage ({
  mode
}: ArticlePageProps) {
  const urlParams = useParams();

  const [searchParams] = useSearchParams();

  const articleItemIsLoaded = useRef(false);

  const [topicId, setTopicId] = useState(getModule().getArticlePageService().getUrlSearch(searchParams).topicId);

  const handleArticleItemLoadActionCompleted = useCallback((payload: ArticleItemStoreSetActionPayload) => {
      if (mode !== ArticlePageMode.New) {
        setTopicId(payload?.data?.item?.data.topicId ?? 0);
      }

      articleItemIsLoaded.current = true;
    },
    [mode]
  );

  let articleId = Number(urlParams.articleId ?? 0);

  if (isNaN(articleId)) {
    articleId = 0;
  }

  const payloadOfLoadActionForTreeItem: TopicItemStoreLoadActionPayload = useMemo(
    () => {
      const result: TopicItemStoreLoadActionPayload = {
        id: topicId,
        axis: TreeGetOperationAxisForItem.Self
      };

      return result;
    },
    [topicId]
  );

  getModule().getTopicItemViewHooks().useStoreLoadActionOutput({
    payloadOfLoadAction: payloadOfLoadActionForTreeItem,
    isCanceled: !articleItemIsLoaded.current
  });

  const topicPageLastUrl = getModule().getTopicPageService().lastUrl;

  return (
    mode === ArticlePageMode.Display
      ? <ArticleItemView
          articleId={articleId}
          onArticleItemLoadActionCompleted={handleArticleItemLoadActionCompleted}
          topicPageLastUrl={topicPageLastUrl}
        />
      : <ArticleItemEditView
          articleId={articleId}
          onArticleItemLoadActionCompleted={handleArticleItemLoadActionCompleted}
          topicId={topicId}
          topicPageLastUrl={topicPageLastUrl}
        />
  )
});
