import React from 'react';
import { useParams } from 'react-router-dom';
import SpinnerControl from '../../controls/Spinner/SpinnerControl';
import {
  ArticleListStoreStatus,
  useArticleListStoreState,
  useArticleListStoreDispatchToLoad,
  useArticleListStoreDispatchToClear
} from '../../store/Article/List/articleListStoreSlice';
import ArticleTableView from '../../views/ArticleTable/ArticleTableView';
import styles from './TopicPage.module.css';

export default function TopicPage () {
  const urlParams = useParams();

  const { data: articles, requestStatus } = useArticleListStoreState();

  const topicId = Number(urlParams.topicId);

  useArticleListStoreDispatchToLoad(topicId);

  useArticleListStoreDispatchToClear();

  return (
    <div className={styles.root}>
      <h1>TopicPage {topicId}</h1>
      {requestStatus === ArticleListStoreStatus.Pending ? <SpinnerControl/> : <ArticleTableView articles={articles}/> }
    </div>
  )
}
