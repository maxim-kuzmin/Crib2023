import React from 'react';
import {
  type ArticleDomainEntityForList,
  type ArticleTableViewProps
} from '../../../all';
import styles from './ArticleTableView.module.css';

export const ArticleTableView: React.FC<ArticleTableViewProps> = ({ response }: ArticleTableViewProps) => {
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
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
              {
                items.map(item => {
                    const data = item.data;
                    return (
                      <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                      </tr>
                    );
                  }
                )
              }
              </tbody>
            </table>
            Total: {totalCount}
          </>
        )
        : null
      }
    </div>
  )
}
