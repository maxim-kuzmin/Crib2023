import React from 'react';
import { useParams } from 'react-router-dom';
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

  useArticleItemStoreDispatchToLoad(true, articleId);

  useArticleItemStoreDispatchToClear(true);

  return (
    <div className={styles.root}>
      <h1>ArticlePage {articleId}</h1>
      {requestStatus === ArticleItemStoreStatus.Pending
        ? <SpinnerControl/>
        : <ArticleView article={article}/>}
    </div>
  )
}
