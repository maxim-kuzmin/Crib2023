import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getModule } from '../../app';
import { TreeGetOperationAxisForItem, type TableControlPagination } from '../../common';
import { ArticleTableView } from '../../views';
import { type TopicItemStoreLoadActionPayload } from '../../app/Stores';

export const TopicPage: React.FC = memo(
function TopicPage () {
  const urlParams = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  let topicId = Number(urlParams.topicId ?? 0);

  if (isNaN(topicId)) {
    topicId = 0;
  }

  const topicPageService = getModule().getTopicPageService();

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
    () => ({
      id: topicId,
      axis: TreeGetOperationAxisForItem.Self
    }),
    [topicId]
  );

  getModule().getTopicItemViewHooks().useLoadActionOutput({
    payloadOfLoadAction: payloadOfLoadActionForTreeItem
  });

  const onTableChange = useCallback((pagination: TableControlPagination) => {
    const { pageNumber, pageSize } = pagination;

    getModule().getTopicPageService().updateURLSearchParams(searchParams, {
      pageNumber,
      pageSize
    });

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <ArticleTableView
      onTableChange={onTableChange}
      pageNumber={pageNumber}
      pageSize={pageSize}
      topicId={topicId}
    />
  )
});
