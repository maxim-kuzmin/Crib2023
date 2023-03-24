import React from 'react';
import {
  type ArticleEntity,
  type ArticleViewProps
} from '../../../all';
import styles from './ArticleView.module.css';

export function ArticleView ({ response }: ArticleViewProps) {
  let entity: ArticleEntity | null = null;

  if (response?.data) {
    entity = response.data.item
  }

  return (
    <div className={styles.root}>
      <h2>ArticleView</h2>
      {entity?.data.id}
    </div>
  )
}
