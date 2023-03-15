import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { StoreDispatchType, StoreStatus } from '../../common';
import { SpinnerControl } from '../../controls';
import {
  articleListStoreSlice,
  topicItemStoreSlice,
  topicPathStoreSlice
} from '../../stores';
import { ArticleTableView } from '../../views';
import styles from './TopicPage.module.css';

export function TopicPage () {
  const urlParams = useParams();

  const { data: articles, requestStatus } = articleListStoreSlice.useState();

  const topicId = Number(urlParams.topicId);

  articleListStoreSlice.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    inputAtDispatch: topicId
  });

  articleListStoreSlice.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicPathDispatchToSet = topicPathStoreSlice.useDispatchToSet();

  const callbackOnTopicItemLoad = useCallback((data: string | null) => {
    topicPathDispatchToSet.run(`TopicPath from ${data ?? ''}`);
  }, [topicPathDispatchToSet]);

  topicItemStoreSlice.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: topicId
  });

  topicItemStoreSlice.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  return (
    <div className={styles.root}>
      <h1>TopicPage {topicId}</h1>
      {requestStatus === StoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleTableView articles={articles}/>}
    </div>
  )
}
