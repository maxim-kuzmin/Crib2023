import React, { useMemo, type Key } from 'react';
import {
  TableControl,
  type ArticleDomainEntityForList,
  type ArticleTableViewProps,
  type TableControlColumn,
  type TableControlPagination,
  type BreadcrumbControlItem,
  BreadcrumbControl,
  type ArticleTableViewRow
} from '../../../all';
import styles from './ArticleTableView.module.css';
import { Link } from 'react-router-dom';

const controlColumns: TableControlColumn[] = [
  {
    field: 'id',
    title: '@@Id'
  },
  {
    field: 'title',
    title: '@@Title',
    render: (row: any) => {
      const viewRow: ArticleTableViewRow = row;

      const { id, title } = viewRow;

      return <Link to={`/article/${id}`}>{title}</Link>;
    }
  },
  {
    field: 'path',
    title: '@@Path',
    render: (row: any) => {
      const viewRow: ArticleTableViewRow = row;

      const { path } = viewRow;

      const controlItems: BreadcrumbControlItem[] = path.map((item) => {
        const { id, name } = item;

        return {
          href: `/topic/${id}`,
          key: id,
          title: name
        };
      });

      return <BreadcrumbControl controlItems={controlItems} />
    }
  }
]

function getRowKey (record: any): Key {
  return record.id;
}

export const ArticleTableView: React.FC<ArticleTableViewProps> = ({
  loading,
  onTableChangeCallback,
  pageNumber,
  pageSize,
  response
}: ArticleTableViewProps) => {
  let items: ArticleDomainEntityForList[];
  let totalCount = 0;

  let controlRows: ArticleTableViewRow[] = [];

  if (response?.data) {
    const { data } = response;

    items = data.items;
    totalCount = data.totalCount;

    if (items.length > 0) {
      controlRows = items.map((item) => {
        const { data, topicPathItems } = item;
        const { id, title } = data;

        return {
          id,
          path: topicPathItems,
          title
        }
      });
    }
  }

  const controlPagination: TableControlPagination = useMemo(() => ({
    pageNumber,
    pageSize,
    totalCount
  }), [pageNumber, pageSize, totalCount]);

  return (
    <div className={styles.root}>
      <TableControl
        controlColumns={controlColumns}
        controlRows={controlRows}
        controlPagination={controlPagination}
        getRowKeyCallback={getRowKey}
        loading={loading}
        onChangeCallback={onTableChangeCallback}
      />
    </div>
  )
}
