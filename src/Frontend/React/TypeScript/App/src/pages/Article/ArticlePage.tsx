import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppInstance } from '../../app';
import { TreeGetOperationAxisForItem } from '../../common';
import {
  type ArticleItemStoreSetActionResult,
  type TopicItemStoreLoadActionResult,
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

  const articleItemIsLoadedRef = useRef(false);

  const { hooks, modules } = useAppInstance();

  const [topicId, setTopicId] = useState(
    modules.Pages.Article.getService().getUrlSearch(searchParams).topicId
  );

  const handleArticleItemLoadActionCompleted = useCallback((actionResult: ArticleItemStoreSetActionResult) => {
      if (mode !== ArticleItemViewMode.New) {
        setTopicId(actionResult?.data?.item?.data.topicId ?? 0);
      }

      articleItemIsLoadedRef.current = true;
    },
    [mode]
  );

  let articleId = Number(urlParams.articleId ?? 0);

  if (isNaN(articleId)) {
    articleId = 0;
  }

  const resultOfLoadActionForTreeItem: TopicItemStoreLoadActionResult = useMemo(
    () => {
      const result: TopicItemStoreLoadActionResult = {
        id: topicId,
        axis: TreeGetOperationAxisForItem.Self
      };

      return result;
    },
    [topicId]
  );

  const articleItemIsLoaded = articleItemIsLoadedRef.current;

  const abortControllerOfLoadActionForTreeItem = useMemo(
    () => {
      const result = new AbortController();

      if (!articleItemIsLoaded) {
        result.abort();
      }

      return result;
    },
    [articleItemIsLoaded]
  );

  hooks.Views.Topic.Item.useStoreLoadActionOutput({
    resultOfLoadAction: resultOfLoadActionForTreeItem,
    abortController: abortControllerOfLoadActionForTreeItem
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
