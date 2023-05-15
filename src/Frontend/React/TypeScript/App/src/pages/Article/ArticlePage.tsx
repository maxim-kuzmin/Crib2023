import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppInstance } from '../../app';
import { TreeGetOperationAxisForItem } from '../../common';
import {
  type TopicItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionPayload
} from '../../features';
import {
  ArticleItemEditView,
  ArticleItemView,
  ArticleItemViewMode
} from '../../views';
import { type ArticlePageProps } from './ArticlePageProps';

export const ArticlePage: React.FC<ArticlePageProps> = memo(
function ArticlePage ({
  mode
}: ArticlePageProps): React.ReactElement<ArticlePageProps> | null {
  const urlParams = useParams();

  const [searchParams] = useSearchParams();

  const articleItemIsLoaded = useRef(false);

  const { hooks, modules } = useAppInstance();

  const [topicId, setTopicId] = useState(
    modules.Pages.Article.getService().getUrlSearch(searchParams).topicId
  );

  const handleArticleItemLoadActionCompleted = useCallback((payload: ArticleItemStoreSetActionPayload) => {
      if (mode !== ArticleItemViewMode.New) {
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

  hooks.Views.Topic.Item.useStoreLoadActionOutput({
    payloadOfLoadAction: payloadOfLoadActionForTreeItem,
    isCanceled: !articleItemIsLoaded.current
  });

  const topicPageLastUrl = modules.Pages.Topic.getService().lastUrl;

  const serviceOfArticlePage = modules.Pages.Article.getService();

  const articlePageUrl = useMemo(
    () => serviceOfArticlePage.createUrl({ articleId }),
    [articleId, serviceOfArticlePage]
  );

  const articleEditPageUrl = useMemo(
    () => serviceOfArticlePage.createUrl({ articleId, mode: ArticleItemViewMode.Edit }),
    [articleId, serviceOfArticlePage]
  );

  return (
    mode === ArticleItemViewMode.Display
      ? <ArticleItemView
          articleId={articleId}
          articleEditPageUrl={articleEditPageUrl}
          onArticleItemLoadActionCompleted={handleArticleItemLoadActionCompleted}
          topicPageLastUrl={topicPageLastUrl}
        />
      : <ArticleItemEditView
          articleId={articleId}
          articlePageUrl={articlePageUrl}
          onArticleItemLoadActionCompleted={handleArticleItemLoadActionCompleted}
          topicId={topicId}
          topicPageLastUrl={topicPageLastUrl}
        />
  )
});
