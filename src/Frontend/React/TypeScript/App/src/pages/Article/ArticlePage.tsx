import React, { memo, useCallback, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getModule } from '../../app/ModuleImpl';
import { type ArticlePageProps } from './ArticlePageProps';
import { type ArticleItemStoreSetActionPayload } from '../../app/Stores';
import { ArticleItemEditView, ArticleItemView } from '../../views';
import { ArticlePageMode } from './ArticlePageMode';

export const ArticlePage: React.FC<ArticlePageProps> = memo(
function ArticlePage ({
  mode
}: ArticlePageProps) {
  const urlParams = useParams();

  const [searchParams] = useSearchParams();

  const articleItemIsLoaded = useRef(false);

  const [topicId, setTopicId] = useState(getModule().getArticlePageService().getUrlSearch(searchParams).topicId);

  const handleArticleItemLoaded = useCallback((payload: ArticleItemStoreSetActionPayload) => {
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

  getModule().getTopicItemViewHooks().useLoadActionOutput({ topicId, isCanceled: !articleItemIsLoaded.current });

  const topicPageLastUrl = getModule().getTopicPageService().lastUrl;

  return (
    mode === ArticlePageMode.Display
      ? <ArticleItemView
          articleId={articleId}
          onArticleItemLoadActionCompleted={handleArticleItemLoaded}
          topicPageLastUrl={topicPageLastUrl}
        />
      : <ArticleItemEditView
          articleId={articleId}
          onArticleItemLoadActionCompleted={handleArticleItemLoaded}
          topicId={topicId}
          topicPageLastUrl={topicPageLastUrl}
        />
  )
});
