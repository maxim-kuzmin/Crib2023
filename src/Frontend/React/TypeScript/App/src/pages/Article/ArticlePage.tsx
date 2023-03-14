import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreDispatchType, StoreStatus } from '../../common';
import { SpinnerControl } from '../../controls';
import { articleItemStoreSlice, topicPathStoreSlice } from '../../stores';
import { ArticleView } from '../../views';
import styles from './ArticlePage.module.css';

export function ArticlePage () {
  const urlParams = useParams();

  const { data: article, requestStatus } = articleItemStoreSlice.useState();

  const articleId = Number(urlParams.articleId);

  const runTopicPathStoreDispatchToSet = topicPathStoreSlice.useDispatchToSet();

  const callbackOnArticleItemLoad = useCallback((data: string | null) => {
    runTopicPathStoreDispatchToSet(`TopicPath from ${data ?? ''}`);
  }, [runTopicPathStoreDispatchToSet]);

  articleItemStoreSlice.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtDispatch: articleId
  });

  articleItemStoreSlice.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const [val, setVal] = useState('');

  return (
    <div className={styles.root}>
      <h1>ArticlePage {articleId}</h1>
      <input name='name' value={val} onChange={(e) => {
        setVal(e.target.value);
        }}/>
      {requestStatus === StoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleView article={article}/>}
    </div>
  )
}
