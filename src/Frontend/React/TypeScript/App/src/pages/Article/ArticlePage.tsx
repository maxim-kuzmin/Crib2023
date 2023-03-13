import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppStoreDispatchType, AppStoreStatus } from '../../app/store';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import articleItemStoreSlice from '../../store/Article/Item/articleItemStoreSlice';
import topicPathStoreSlice from '../../store/Topic/Path/topicPathStoreSlice';
import ArticleView from '../../views/Article/ArticleView';
import styles from './ArticlePage.module.css';

export default function ArticlePage () {
  const urlParams = useParams();

  const { data: article, requestStatus } = articleItemStoreSlice.useState();

  const articleId = Number(urlParams.articleId);

  const runTopicPathStoreDispatchToSet = topicPathStoreSlice.useDispatchToSet();

  const callbackOnArticleItemLoad = useCallback((data: string | null) => {
    runTopicPathStoreDispatchToSet(`TopicPath from ${data ?? ''}`);
  }, [runTopicPathStoreDispatchToSet]);

  articleItemStoreSlice.useDispatchToLoad({
    dispatchType: AppStoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtDispatch: articleId
  });

  articleItemStoreSlice.useDispatchToClear({
    dispatchType: AppStoreDispatchType.Unmount
  });

  const [val, setVal] = useState('');

  return (
    <div className={styles.root}>
      <h1>ArticlePage {articleId}</h1>
      <input name='name' value={val} onChange={(e) => {
        setVal(e.target.value);
        }}/>
      {requestStatus === AppStoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleView article={article}/>}
    </div>
  )
}
