import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArticleTableView,
  getModule,
  SpinnerControl,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationResponse,
  type TopicDomainItemGetOperationResponse,
  TreeNodeGetOperationAxis
} from '../../all';
import styles from './TopicPage.module.css';

export function TopicPage () {
  const urlParams = useParams();

  const {
    getArticleListStoreService,
    getTopicItemStoreService,
    getTopicPathStoreService
  } = getModule();

  const articleListStoreService = getArticleListStoreService();

  const { data: articleListResponse, status } = articleListStoreService.useState();

  const topicId = Number(urlParams.topicId ?? 0);
  const inputAtDispatch: ArticleDomainListGetOperationInput = useMemo(() => ({
    topicId,
    pageNumber: 1,
    pageSize: 10
  }), [topicId]);

  const callbackOnArticleListLoad = useCallback((response: ArticleDomainListGetOperationResponse | null) => {
    console.log('MAKC:ArticlePage:callbackOnArticleListLoad:response', response);
  }, []);

  articleListStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleListLoad,
    inputAtDispatch
  });

  articleListStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicPathStoreService = getTopicPathStoreService();

  const topicPathDispatchToSet = topicPathStoreService.useDispatchToSet();

  const callbackOnTopicItemLoad = useCallback((response: TopicDomainItemGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemLoad:response', response);
    topicPathDispatchToSet.run({
      data: {
          items: [],
          totalCount: 0
      },
      operationCode: response?.operationCode ?? '',
      operationName: response?.operationName ?? '',
    });
  }, [topicPathDispatchToSet]);

  const topicItemStoreService = getTopicItemStoreService();

  topicItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: { axis: TreeNodeGetOperationAxis.Self, id: topicId }
  });

  topicItemStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  return (
    <div className={styles.root}>
      <h1>TopicPage {topicId}</h1>
      {status === OperationStatus.Pending
        ? <SpinnerControl/>
        : <ArticleTableView response={articleListResponse}/>}
    </div>
  )
}
