import React, { useCallback, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getModule,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationResponse
} from '../../all';

import styles from './ArticlePage.module.css';
import { Card } from 'antd';

export const ArticlePage: React.FC = () => {
  const urlParams = useParams();

  const {
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

  // const [val, setVal] = useState('1111');

  const articleItemLoading = (articleItemStatus === OperationStatus.Pending);

  return (
    <div className={styles.root}>
      <Card
        loading={articleItemLoading}
        title={<h1>{articleItemResoponse?.data?.item.data.title}</h1>}
        extra={`ID: ${articleItemResoponse?.data?.item.data.id ?? 0}`}
        actions={[
          <Link key="edit" to={'#'}>Edit</Link>,
          <Link key="delete" to={'#'}>Delete</Link>
        ]}>
        { (articleItemResoponse?.data?.item.data.body ?? '').split('\n').map((x, i) => <p key={i}>{x.trim()}</p>) }
      </Card>
      {/* <h1>ArticlePage {articleId}</h1>
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
      } */}
    </div>
  )
}
