import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotificationType, StoreDispatchType, StoreStatus } from '../../common';
import { SpinnerControl } from '../../controls';
import { appNotificationStoreSlice, articleItemStoreSlice, topicPathStoreSlice } from '../../stores';
import { ArticleView } from '../../views';
import styles from './ArticlePage.module.css';

export function ArticlePage () {
  const urlParams = useParams();

  const { data: article, requestStatus } = articleItemStoreSlice.useState();

  const articleId = Number(urlParams.articleId);

  const appNotificationDispatchToSet = appNotificationStoreSlice.useDispatchToSet();

  const topicPathDispatchToSet = topicPathStoreSlice.useDispatchToSet();

  const callbackOnArticleItemLoad = useCallback((data: string | null) => {
    topicPathDispatchToSet.run(`TopicPath from ${data ?? ''}`);
  }, [topicPathDispatchToSet]);

  articleItemStoreSlice.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtDispatch: articleId
  });

  articleItemStoreSlice.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const [val, setVal] = useState('1111');

  return (
    <div className={styles.root}>
      <h1>ArticlePage {articleId}</h1>
      <input name='name' value={val} onChange={(e) => {
        setVal(e.target.value);
        }}/>
      <button onClick={(e) => {
          appNotificationDispatchToSet.run({
            type: NotificationType.Error,
            message: val
          })
      }}>Notify</button>
      {requestStatus === StoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleView article={article}/>}
    </div>
  )
}
