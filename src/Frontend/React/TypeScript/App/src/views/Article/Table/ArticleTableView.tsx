import React from 'react';
import {
  type ArticleDomainEntityForList,
  type ArticleTableViewProps
} from '../../../all';
import styles from './ArticleTableView.module.css';

export function ArticleTableView ({ response }: ArticleTableViewProps) {
  let items: ArticleDomainEntityForList[] | null = null;
  let totalCount = 0;

  if (response?.data) {
    const { data } = response;

    items = data.items;
    totalCount = data.totalCount;
  }

  return (
    <div className={styles.root}>
      <h2>ArticleTableView</h2>
      { items
        ? (
          <>
            <ul>
              {
                items.map(item => {
                    const data = item.data;
                    return (
                      <li key={data.id}>{data.id}</li>
                    );
                  }
                )
              }
            </ul>
            Total: {totalCount}
          </>
        )
        : null
      }
    </div>
  )
}
