import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppInstance } from '../../app';
import { TreeGetOperationAxisForItem, type TableControlPagination } from '../../common';
import { type TopicItemStoreLoadActionPayload } from '../../features';
import { ArticleTableView } from '../../views';

export const TopicPage: React.FC = memo(
function TopicPage (): React.ReactElement | null {
  const urlParams = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  let topicId = Number(urlParams.topicId ?? 0);

  if (isNaN(topicId)) {
    topicId = 0;
  }

  const { hooks, modules } = useAppInstance();

  const topicPageService = modules.Pages.Topic.getService();

  const topicPageSearch = topicPageService.getUrlSearch(searchParams);

  const topicPageLastUrl = topicPageService.createUrl({ topicId, search: topicPageSearch });

  useEffect(() => {
      return () => {
        topicPageService.lastUrl = topicPageLastUrl;
      };
    },
    [topicPageLastUrl, topicPageService]
  );

  const { pageNumber, pageSize } = topicPageSearch;

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
    payloadOfLoadAction: payloadOfLoadActionForTreeItem
  });

  const onTableChange = useCallback((pagination: TableControlPagination) => {
    const { pageNumber, pageSize } = pagination;

    modules.Pages.Topic.getService().updateURLSearchParams(searchParams, {
      pageNumber,
      pageSize
    });

    setSearchParams(searchParams);
  }, [modules, searchParams, setSearchParams]);

  return (
    <ArticleTableView
      onTableChange={onTableChange}
      pageNumber={pageNumber}
      pageSize={pageSize}
      topicId={topicId}
    />
  )
});
