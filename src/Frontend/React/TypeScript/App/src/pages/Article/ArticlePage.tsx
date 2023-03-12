import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppRunType from '../../app/AppRunType';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import {
  ArticleItemStoreStatus,
  useArticleItemStoreState,
  useArticleItemStoreDispatchToLoad,
  useArticleItemStoreDispatchToClear
} from '../../store/Article/Item/articleItemStoreSlice';
import ArticleView from '../../views/Article/ArticleView';
import styles from './ArticlePage.module.css';

export default function ArticlePage () {
  const urlParams = useParams();

  const { data: article, requestStatus } = useArticleItemStoreState();

  const articleId = Number(urlParams.articleId);

  useArticleItemStoreDispatchToLoad({
    runType: AppRunType.MountOrUpdate,
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
