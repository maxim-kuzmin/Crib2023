import React, { memo, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  ArticleTableView,
  getModule,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainListGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TableControlPagination,
  type ArticleListStoreSetActionPayload,
  type TopicItemStoreSetActionPayload
} from '../../all';

export const TopicPage: React.FC = memo(
    function TopicPage () {
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const articleListStoreHooks = getModule().getArticleListStoreHooks();

  const { payloadFromSetAction: articleListResponse, status: articleListStatus } = articleListStoreHooks.useState();

  let topicId = Number(urlParams.topicId ?? 0);

  if (isNaN(topicId)) {
    topicId = 0;
  }

  const topicPageService = getModule().getTopicPageService();

  const topicPageSearch = topicPageService.getUrlSearch(searchParams);

  const topicPageLastUrl = topicPageService.createUrl({ topicId, search: topicPageSearch });

  const { pageNumber, pageSize } = topicPageSearch;

  const callbackOnArticleListLoad = useCallback((payload: ArticleListStoreSetActionPayload) => {
    console.log('MAKC:TopicPage:callbackOnArticleListLoad:response', payload);
  }, []);

  const payloadToArticleListLoad: ArticleDomainListGetOperationInput = useMemo(
    () => ({
      topicId,
      pageNumber,
      pageSize
    }),
    [pageNumber, pageSize, topicId]
  );

  articleListStoreHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleListLoad,
    payload: payloadToArticleListLoad
  });

  articleListStoreHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreHooks = getModule().getTopicItemStoreHooks();

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

  topicItemStoreHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    payload: payloadToTopicItemLoad
  });

  const callbackOnTopicItemClear = useCallback(() => {
    console.log('MAKC:TopicPage:callbackOnTopicItemClear:topicPageLastUrl', topicPageLastUrl);

    topicPageService.lastUrl = topicPageLastUrl;
  }, [topicPageLastUrl, topicPageService]);

  topicItemStoreHooks.useDispatchToClear({
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
