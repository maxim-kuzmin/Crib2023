import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppInstance } from '../../app';
import { TreeGetOperationAxisForItem, type TableControlPagination } from '../../common';
import { type TopicItemStoreLoadActionResult } from '../../features';
import { ArticleItemViewMode, ArticleTableView } from '../../views';

export const TopicPage: React.FC = memo(
function TopicPage (): React.ReactElement | null {
  const urlParams = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  let topicId = Number(urlParams.topicId ?? 0);

  if (isNaN(topicId)) {
    topicId = 0;
  }

  const { hooks, modules } = useAppInstance();

  const serviceOfArticlePage = modules.Pages.Article.getService();

  const serviceOfTopicPage = modules.Pages.Topic.getService();

  const topicPageSearch = serviceOfTopicPage.getUrlSearch(searchParams);

  const topicPageLastUrl = serviceOfTopicPage.createUrl({ topicId, search: topicPageSearch });

  useEffect(() => {
      return () => {
        serviceOfTopicPage.lastUrl = topicPageLastUrl;
      };
    },
    [topicPageLastUrl, serviceOfTopicPage]
  );

  const { pageNumber, pageSize } = topicPageSearch;

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

  hooks.Views.Topic.Item.useStoreLoadActionOutput({
    resultOfLoadAction: resultOfLoadActionForTreeItem
  });

  const onTableChange = useCallback((pagination: TableControlPagination) => {
    const { pageNumber, pageSize } = pagination;

    modules.Pages.Topic.getService().updateURLSearchParams(searchParams, {
      pageNumber,
      pageSize
    });

    setSearchParams(searchParams);
  }, [modules, searchParams, setSearchParams]);

  const createArticlePageUrl = useCallback(
    (articleId: number) => serviceOfArticlePage.createUrl({ articleId }),
    [serviceOfArticlePage]
  );

  const createArticleEditPageUrl = useCallback(
    (articleId: number) => serviceOfArticlePage.createUrl({ articleId, mode: ArticleItemViewMode.Edit }),
    [serviceOfArticlePage]
  );

  const createArticleNewPageUrl = useCallback(
    (topicId: number) => serviceOfArticlePage.createUrl({ search: { topicId } }),
    [serviceOfArticlePage]
  );

  const createTopicPageUrl = useCallback(
    (topicId: number) => serviceOfTopicPage.createUrl({ topicId }),
    [serviceOfTopicPage]
  );

  return (
    <ArticleTableView
      createArticlePageUrl={createArticlePageUrl}
      createArticleEditPageUrl={createArticleEditPageUrl}
      createArticleNewPageUrl={createArticleNewPageUrl}
      createTopicPageUrl={createTopicPageUrl}
      onTableChange={onTableChange}
      pageNumber={pageNumber}
      pageSize={pageSize}
      topicId={topicId}
    />
  )
});
