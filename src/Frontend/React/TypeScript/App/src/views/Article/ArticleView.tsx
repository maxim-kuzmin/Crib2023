import React from 'react';
import styles from './ArticleView.module.css';
import type ArticleViewProps from './ArticleViewProps';

export default function ArticleView ({ article }: ArticleViewProps) {
  return (
    <div className={styles.root}>
      <h2>ArticleView</h2>
      {article}
    </div>
  )
}
