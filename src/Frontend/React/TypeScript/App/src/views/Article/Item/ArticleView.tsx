import React from 'react';
import { type ArticleViewProps } from '../../../all';
import styles from './ArticleView.module.css';

export function ArticleView ({ article }: ArticleViewProps) {
  return (
    <div className={styles.root}>
      <h2>ArticleView</h2>
      {article?.data?.item?.data.id}
    </div>
  )
}
