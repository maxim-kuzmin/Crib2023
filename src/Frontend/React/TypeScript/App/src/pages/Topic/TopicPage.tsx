import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AppStoreDispatchType, AppStoreStatus } from '../../app/store';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import articleListStoreSlice from '../../store/Article/List/articleListStoreSlice';
import topicItemStoreSlice from '../../store/Topic/Item/topicItemStoreSlice';
import topicPathStoreSlice from '../../store/Topic/Path/topicPathStoreSlice';
import ArticleTableView from '../../views/ArticleTable/ArticleTableView';
import styles from './TopicPage.module.css';

export default function TopicPage () {
  const urlParams = useParams();

  const { data: articles, requestStatus } = articleListStoreSlice.useState();

  const topicId = Number(urlParams.topicId);

  articleListStoreSlice.useDispatchToLoad({
    dispatchType: AppStoreDispatchType.MountOrUpdate,
    inputAtDispatch: topicId
  });

  articleListStoreSlice.useDispatchToClear({
    dispatchType: AppStoreDispatchType.Unmount
  });

  const runTopicPathStoreDispatchToSet = topicPathStoreSlice.useDispatchToSet();

  const callbackOnTopicItemLoad = useCallback((data: string | null) => {
    runTopicPathStoreDispatchToSet(`TopicPath from ${data ?? ''}`);
  }, [runTopicPathStoreDispatchToSet]);

  topicItemStoreSlice.useDispatchToLoad({
    dispatchType: AppStoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: topicId
  });

  topicItemStoreSlice.useDispatchToClear({
    dispatchType: AppStoreDispatchType.Unmount
  });

  return (
    <div className={styles.root}>
      <h1>TopicPage {topicId}</h1>
      {requestStatus === AppStoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleTableView articles={articles}/>}
    </div>
  )
}
