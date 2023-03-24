import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArticleView,
  getModule,
  NotificationType,
  SpinnerControl,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemGetOperationInput
} from '../../all';

import styles from './ArticlePage.module.css';

export function ArticlePage () {
  const urlParams = useParams();

  const {
    getAppNotificationStoreService,
    getArticleItemStoreService,
    getTopicPathStoreService
  } = getModule();

  const articleItemStoreService = getArticleItemStoreService();

  const { data: article, status } = articleItemStoreService.useState();

  const articleId = Number(urlParams.articleId);

  const appNotificationStoreService = getAppNotificationStoreService();

  const appNotificationDispatchToSet = appNotificationStoreService.useDispatchToSet();

  const topicPathStoreService = getTopicPathStoreService();

  const topicPathDispatchToSet = topicPathStoreService.useDispatchToSet();

  const callbackOnArticleItemLoad = useCallback((response: ArticleDomainItemGetOperationResponse | null) => {
    console.log('MAKC:ArticlePage:callbackOnArticleItemLoad:response', response);
    topicPathDispatchToSet.run(`TopicPath from ${response?.data?.item?.data.id ?? ''}`);
  }, [topicPathDispatchToSet]);

  const inputAtDispatch: ArticleDomainItemGetOperationInput = useMemo(() => ({ id: articleId }), [articleId]);

  articleItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtDispatch
  });

  articleItemStoreService.useDispatchToClear({
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
      {status === OperationStatus.Pending
        ? <SpinnerControl/>
        : <ArticleView article={article}/>}
    </div>
  )
}
