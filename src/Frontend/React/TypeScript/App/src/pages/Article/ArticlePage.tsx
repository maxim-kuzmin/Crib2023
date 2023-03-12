import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppRunType from '../../app/AppRunType';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import {
  ArticleItemStoreStatus,
  useArticleItemStoreState,
  useArticleItemStoreDispatchToLoad,
  useArticleItemStoreDispatchToClear
} from '../../store/Article/Item/articleItemStoreSlice';
import { useTopicPathStoreDispatchToSet } from '../../store/Topic/Path/topicPathStoreSlice';
import ArticleView from '../../views/Article/ArticleView';
import styles from './ArticlePage.module.css';

export default function ArticlePage () {
  const urlParams = useParams();

  const { data: article, requestStatus } = useArticleItemStoreState();

  const articleId = Number(urlParams.articleId);

  const runTopicPathStoreDispatchToSet = useTopicPathStoreDispatchToSet();

  const callbackOnArticleItemLoad = useCallback((data: string | null) => {
    runTopicPathStoreDispatchToSet(`TopicPath from ${data ?? ''}`);
  }, [runTopicPathStoreDispatchToSet]);

  useArticleItemStoreDispatchToLoad({
    runType: AppRunType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtRun: articleId
  });

  useArticleItemStoreDispatchToClear({
    runType: AppRunType.Unmount
  });

  const [val, setVal] = useState('');

  return (
    <div className={styles.root}>
      <h1>ArticlePage {articleId}</h1>
      <input name='name' value={val} onChange={(e) => {
        setVal(e.target.value);
        }}/>
      {requestStatus === ArticleItemStoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleView article={article}/>}
    </div>
  )
}
