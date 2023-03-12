import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AppRunType from '../../app/AppRunType';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import {
  ArticleListStoreStatus,
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
    runType: AppRunType.MountOrUpdate,
    inputAtRun: topicId
  });

  useArticleListStoreDispatchToClear({
    runType: AppRunType.Unmount
  });

  const runTopicPathStoreDispatchToSet = useTopicPathStoreDispatchToSet();

  const callbackOnTopicItemLoad = useCallback((data: string | null) => {
    runTopicPathStoreDispatchToSet(`TopicPath from ${data ?? ''}`);
  }, [runTopicPathStoreDispatchToSet]);

  useTopicItemStoreDispatchToLoad({
    runType: AppRunType.MountOrUpdate,
    callback: callbackOnTopicItemLoad,
    inputAtRun: topicId
  });

  useTopicItemStoreDispatchToClear({
    runType: AppRunType.Unmount
  });

  return (
    <div className={styles.root}>
      <h1>TopicPage {topicId}</h1>
      {requestStatus === ArticleListStoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleTableView articles={articles}/>}
    </div>
  )
}
