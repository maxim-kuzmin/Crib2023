import React, { memo, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  ArticleTableView,
  getModule,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationResponse,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationResponse,
  type TableControlPagination
} from '../../all';

export const TopicPage: React.FC = memo(function TopicPage () {
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const articleListStoreService = getModule().getArticleListStoreService();

  const { response: articleListResponse, status: articleListStatus } = articleListStoreService.useState();

  let topicId = Number(urlParams.topicId ?? 0);

  if (isNaN(topicId)) {
    topicId = 0;
  }

  const { pageNumber, pageSize } = getModule().getTopicPageService().getUrlSearch(searchParams);

  const callbackOnArticleListLoad = useCallback((response: ArticleDomainListGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnArticleListLoad:response', response);
  }, []);

  const inputAtDispatchToArticleListLoad: ArticleDomainListGetOperationInput = useMemo(
    () => ({
      topicId,
      pageNumber,
      pageSize
    }),
    [pageNumber, pageSize, topicId]
  );

  articleListStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleListLoad,
    inputAtDispatch: inputAtDispatchToArticleListLoad
  });

  articleListStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreService = getModule().getTopicItemStoreService();

  const callbackOnTopicItemLoad = useCallback((response: TopicDomainItemGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemtLoad:response', response);
  }, []);

  const inputAtDispatchToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(
    () => ({
      axis: TreeGetOperationAxisForItem.Self,
      id: topicId
    }),
    [topicId]
  );

  topicItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: inputAtDispatchToTopicItemLoad
  });

  topicItemStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const onTableChangeCallback = useCallback((pagination: TableControlPagination) => {
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
      onTableChangeCallback={onTableChangeCallback}
      pageNumber={pageNumber}
      pageSize={pageSize}
      topicId={topicId}
    />
  )
});
