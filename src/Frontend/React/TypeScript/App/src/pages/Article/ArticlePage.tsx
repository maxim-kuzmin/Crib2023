import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerWrapper from '../../wrappers/Spinner/SpinnerWrapper';
import ArticleView from '../../views/Article/ArticleView';
import styles from './ArticlePage.module.css';
import {
  useArticlePageDispatch,
  createArticlePageClearAction,
  createArticlePageArticleLoadingAction,
  useArticlePageState,
  createArticlePageArticleLoadedAction
} from './ArticlePageStoreProvider';

export default function ArticlePage () {
  const urlParams = useParams();
  const dispatch = useArticlePageDispatch();
  const { article, articleIsLoading } = useArticlePageState();

  const articleIdParam = Number(urlParams.articleId);

  useEffect(() => {
    async function loadData (articleId: number) {
      dispatch(createArticlePageArticleLoadingAction(articleIdParam));

      const promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => { resolve(`Article ${articleId}: ${(new Date()).toString()}`); }, 1000)
      });

      const article = await promise;

      dispatch(createArticlePageArticleLoadedAction(article));
    }

    loadData(articleIdParam);

    return () => {
      dispatch(createArticlePageClearAction());
    };
  }, [articleIdParam]);

  return (
    <div className={styles.root}>
      <h1>ArticlePage {articleIdParam}</h1>
      {articleIsLoading ? <SpinnerWrapper/> : <ArticleView article={article}/> }
    </div>
  )
}
