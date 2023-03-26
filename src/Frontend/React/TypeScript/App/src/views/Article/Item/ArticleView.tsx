import React from 'react';
import {
  type ArticleTypeEntity,
  type ArticleDomainEntityForItem,
  type ArticleViewProps
} from '../../../all';
import styles from './ArticleView.module.css';

export function ArticleView ({ response }: ArticleViewProps) {
  let item: ArticleDomainEntityForItem | null = null;
  let data: ArticleTypeEntity | null = null;

  if (response?.data) {
    item = response.data.item;
    if (item) {
      data = item.data;
    }
  }

  return (
    <div className={styles.root}>
      <h2>ArticleView</h2>
      { data
        ? (
          <div>
            { data.id }
          </div>
        )
        : null
      }
    </div>
  )
}
