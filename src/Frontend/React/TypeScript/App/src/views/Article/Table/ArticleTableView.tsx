import React from 'react';
import { type ArticleTableViewProps } from '../../../all';
import styles from './ArticleTableView.module.css';

export function ArticleTableView ({ articles }: ArticleTableViewProps) {
  return (
    <div className={styles.root}>
      <h2>ArticleTableView</h2>
      {articles}
    </div>
  )
}
