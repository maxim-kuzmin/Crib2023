import React from 'react';
import ArticleView from '../../views/Article/ArticleView';
import styles from './ArticlePage.module.css';

export default function ArticlePage () {
  return (
    <div className={styles.root}>
      <h1>ArticlePage</h1>
      <ArticleView/>
    </div>
  )
}
