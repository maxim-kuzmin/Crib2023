import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArticleView,
  getModule,
  NotificationType,
  SpinnerControl,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationResponse
} from '../../all';

import styles from './ArticlePage.module.css';

export const ArticlePage: React.FC = () => {
  const urlParams = useParams();

  const {
    getAppNotificationStoreService,
    getArticleItemStoreService,
    getTopicItemStoreService
  } = getModule();

  const articleItemStoreService = getArticleItemStoreService();

  const { response: articleItemResoponse, status: articleItemStatus } = articleItemStoreService.useState();

  const topicId = articleItemResoponse?.data?.item?.data.topicId ?? 0;

  let articleId = Number(urlParams.articleId ?? 0);

  if (isNaN(articleId)) {
    articleId = 0;
  }

  const articleItemIsLoaded = useRef(false);

  const appNotificationStoreService = getAppNotificationStoreService();

  const appNotificationDispatchToSet = appNotificationStoreService.useDispatchToSet();

  const callbackOnArticleItemLoad = useCallback((response: ArticleDomainItemGetOperationResponse | null) => {
    console.log('MAKC:ArticlePage:callbackOnArticleItemLoad:response', response);
    articleItemIsLoaded.current = true;
  }, []);

  const inputAtDispatchToArticleItemLoad: ArticleDomainItemGetOperationInput = useMemo(() => ({
    id: articleId
  }), [articleId]);

  articleItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtDispatch: inputAtDispatchToArticleItemLoad
  });

  articleItemStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreService = getTopicItemStoreService();

  const callbackOnTopicItemLoad = useCallback((response: TopicDomainItemGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemtLoad:response', response);
  }, []);

  const inputAtDispatchToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(() => ({
    axis: TreeGetOperationAxisForItem.Self,
    id: topicId
  }), [topicId]);

  topicItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    isCanceled: !articleItemIsLoaded.current,
    callback: callbackOnTopicItemLoad,
    inputAtDispatch: inputAtDispatchToTopicItemLoad
  });

  topicItemStoreService.useDispatchToClear({
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
      {
        articleItemStatus === OperationStatus.Pending
          ? <SpinnerControl/>
          : <ArticleView response={articleItemResoponse}/>
      }
    </div>
  )
}
