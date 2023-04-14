import React, { memo, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  ArticleTableView,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainListGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TableControlPagination,
  type ArticleListStoreSetActionPayload,
  type TopicItemStoreSetActionPayload,
} from '../../all';
import { getModule } from '../../app/ModuleImpl';

export const TopicPage: React.FC = memo(
function TopicPage () {
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const articleTableViewHooks = getModule().getArticleTableViewHooks();

  const {
    payloadFromSetAction: articleListResponse,
    status: articleListStatus
  } = articleTableViewHooks.useState();

  let topicId = Number(urlParams.topicId ?? 0);

  if (isNaN(topicId)) {
    topicId = 0;
  }

  const topicPageService = getModule().getTopicPageService();

  const topicPageSearch = topicPageService.getUrlSearch(searchParams);

  const topicPageLastUrl = topicPageService.createUrl({ topicId, search: topicPageSearch });

  const { pageNumber, pageSize } = topicPageSearch;

  const callbackOnArticleListLoad = useCallback((payload: ArticleListStoreSetActionPayload) => {
    console.log('MAKC:TopicPage:callbackOnArticleListLoad:payload', payload);
  }, []);

  const payloadToArticleListLoad: ArticleDomainListGetOperationInput = useMemo(
    () => ({
      topicId,
      pageNumber,
      pageSize
    }),
    [pageNumber, pageSize, topicId]
  );

  articleTableViewHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleListLoad,
    payload: payloadToArticleListLoad
  });

  articleTableViewHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemViewHooks = getModule().getTopicItemViewHooks();

  const callbackOnTopicItemLoad = useCallback((payload: TopicItemStoreSetActionPayload) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemtLoad:payload', payload);
  }, []);

  const payloadToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(
    () => ({
      axis: TreeGetOperationAxisForItem.Self,
      id: topicId
    }),
    [topicId]
  );

  topicItemViewHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    payload: payloadToTopicItemLoad
  });

  const callbackOnTopicItemClear = useCallback(() => {
    console.log('MAKC:TopicPage:callbackOnTopicItemClear:topicPageLastUrl', topicPageLastUrl);

    topicPageService.lastUrl = topicPageLastUrl;
  }, [topicPageLastUrl, topicPageService]);

  topicItemViewHooks.useDispatchToClear({
    callback: callbackOnTopicItemClear,
    dispatchType: StoreDispatchType.Unmount
  });

  const onTableChange = useCallback((pagination: TableControlPagination) => {
    const { pageNumber, pageSize } = pagination;

    getModule().getTopicPageService().updateURLSearchParams(searchParams, {
      pageNumber,
      pageSize
    });

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const articleListLoading = (articleListStatus === OperationStatus.Pending);

  return (
    <ArticleTableView
      loading={articleListLoading}
      response={articleListResponse}
      onTableChange={onTableChange}
      pageNumber={pageNumber}
      pageSize={pageSize}
      topicId={topicId}
    />
  )
});
