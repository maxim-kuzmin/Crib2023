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
  TreeNodeGetOperationAxis,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationResponse
} from '../../all';
import styles from './TopicPage.module.css';

export function TopicPage () {
  const urlParams = useParams();

  const {
    getArticleListStoreService,
    getTopicItemStoreService
  } = getModule();

  const articleListStoreService = getArticleListStoreService();

  const { response: articleListResponse, status } = articleListStoreService.useState();

  const topicId = Number(urlParams.topicId ?? 0);

  const inputAtDispatchToArticleListLoad: ArticleDomainListGetOperationInput = useMemo(() => ({
    topicId,
    pageNumber: 1,
    pageSize: 10
  }), [topicId]);

  const callbackOnArticleListLoad = useCallback((response: ArticleDomainListGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnArticleListLoad:response', response);
  }, []);

  articleListStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleListLoad,
    inputAtDispatch: inputAtDispatchToArticleListLoad
  });

  articleListStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreService = getTopicItemStoreService();

  const inputAtDispatchToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(() => ({
    axis: TreeNodeGetOperationAxis.Self,
    id: topicId
  }), [topicId]);

  const callbackOnTopicItemLoad = useCallback((response: TopicDomainItemGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemtLoad:response', response);
  }, []);

  topicItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: inputAtDispatchToTopicItemLoad
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
