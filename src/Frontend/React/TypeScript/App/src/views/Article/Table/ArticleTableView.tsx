import React, { useMemo, type Key } from 'react';
import {
  TableControl,
  type ArticleDomainEntityForList,
  type ArticleTableViewProps,
  type TableControlColumn,
  type TableControlPagination,
  type BreadcrumbControlItem,
  type OptionValueObject,
  BreadcrumbControl
} from '../../../all';
import styles from './ArticleTableView.module.css';

const controlColumns: TableControlColumn[] = [
  {
    field: 'id',
    title: '@@Id'
  },
  {
    field: 'title',
    title: '@@Title'
  },
  {
    field: 'path',
    title: '@@Path',
    render: (value: any) => {
      const topicPathItems: OptionValueObject[] = value;

      const controlItems: BreadcrumbControlItem[] = topicPathItems.map((item) => {
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

  let controlRows: any[] = [];

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
