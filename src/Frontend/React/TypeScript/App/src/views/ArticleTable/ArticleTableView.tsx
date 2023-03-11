import React from 'react';
import styles from './ArticleTableView.module.css';
import type ArticleTableViewProps from './ArticleTableViewProps';

export default function ArticleTableView ({ articles }: ArticleTableViewProps) {
  return (
    <div className={styles.root}>
      <h2>ArticleTableView</h2>
      {articles}
    </div>
  )
}
