import React from 'react';
import ArticleTableView from '../../views/ArticleTable/ArticleTableView';
import styles from './TopicPage.module.css';

export default function TopicPage () {
  return (
    <div className={styles.root}>
      <h1>TopicPage</h1>
      <ArticleTableView/>
    </div>
  )
}
