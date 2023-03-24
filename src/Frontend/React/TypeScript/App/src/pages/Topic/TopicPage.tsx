import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArticleTableView,
  getModule,
  SpinnerControl,
  StoreDispatchType,
  OperationStatus
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

  const { data: articles, status } = articleListStoreService.useState();

  const topicId = Number(urlParams.topicId);

  articleListStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    inputAtDispatch: topicId
  });

  articleListStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicPathStoreService = getTopicPathStoreService();

  const topicPathDispatchToSet = topicPathStoreService.useDispatchToSet();

  const callbackOnTopicItemLoad = useCallback((data: string | null) => {
    topicPathDispatchToSet.run(`TopicPath from ${data ?? ''}`);
  }, [topicPathDispatchToSet]);

  const topicItemStoreService = getTopicItemStoreService();

  topicItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: topicId
  });

  topicItemStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  return (
    <div className={styles.root}>
      <h1>TopicPage {topicId}</h1>
      {status === OperationStatus.Pending
        ? <SpinnerControl/>
        : <ArticleTableView articles={articles}/>}
    </div>
  )
}
