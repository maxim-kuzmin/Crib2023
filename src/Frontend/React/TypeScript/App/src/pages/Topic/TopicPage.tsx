import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AppStoreDispatchType, AppStoreStatus } from '../../app/store';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import {
  useArticleListStoreState,
  useArticleListStoreDispatchToLoad,
  useArticleListStoreDispatchToClear
} from '../../store/Article/List/articleListStoreSlice';
import {
  useTopicItemStoreDispatchToClear,
  useTopicItemStoreDispatchToLoad
} from '../../store/Topic/Item/topicItemStoreSlice';
import { useTopicPathStoreDispatchToSet } from '../../store/Topic/Path/topicPathStoreSlice';
import ArticleTableView from '../../views/ArticleTable/ArticleTableView';
import styles from './TopicPage.module.css';

export default function TopicPage () {
  const urlParams = useParams();

  const { data: articles, requestStatus } = useArticleListStoreState();

  const topicId = Number(urlParams.topicId);

  useArticleListStoreDispatchToLoad({
    dispatchType: AppStoreDispatchType.MountOrUpdate,
    inputAtDispatch: topicId
  });

  useArticleListStoreDispatchToClear({
    dispatchType: AppStoreDispatchType.Unmount
  });

  const runTopicPathStoreDispatchToSet = useTopicPathStoreDispatchToSet();

  const callbackOnTopicItemLoad = useCallback((data: string | null) => {
    runTopicPathStoreDispatchToSet(`TopicPath from ${data ?? ''}`);
  }, [runTopicPathStoreDispatchToSet]);

  useTopicItemStoreDispatchToLoad({
    dispatchType: AppStoreDispatchType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: topicId
  });

  useTopicItemStoreDispatchToClear({
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
