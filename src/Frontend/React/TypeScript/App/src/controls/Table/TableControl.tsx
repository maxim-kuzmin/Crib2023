import React, { useMemo } from 'react';
import { Table } from 'antd';
import { type TablePaginationConfig, type ColumnsType } from 'antd/es/table';
import { type TableControlPagination, type TableControlColumn, type TableControlParams } from '../../all';
import { type TableCurrentDataSource, type FilterValue, type SorterResult } from 'antd/es/table/interface';

function convertToColumns (controlColumns: TableControlColumn[]): ColumnsType<any> {
  return controlColumns.map((controlColumn) => {
    const { field, key, render, title } = controlColumn;

    return {
      dataIndex: field,
      key,
      render,
      title
    }
  });
}

function convertToPagination (controlPagination: TableControlPagination): TablePaginationConfig {
  const { pageNumber, pageSize, totalCount } = controlPagination;

  return {
    ...paginationConfig,
    current: pageNumber,
    pageSize,
    total: totalCount
  };
}

const paginationConfig: TablePaginationConfig = {
  defaultPageSize: 10,
  showTotal: (total, range) => `${range[0]}-${range[1]} @@From ${total}`,
  pageSizeOptions: [10, 20, 50, 100, 1000000],
  position: ['bottomLeft', 'topLeft'],
  size: 'small',
  hideOnSinglePage: false,
  locale: { items_per_page: '@@PerPage' },
}

export const TableControl: React.FC<TableControlParams> = ({
  controlColumns,
  controlPagination,
  controlRows,
  getRowKeyCallback,
  onChangeCallback,
  loading
}: TableControlParams) => {
  const columns = useMemo(() => convertToColumns(controlColumns), [controlColumns]);

  function handleTableChange (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | Array<SorterResult<any>>,
    extra: TableCurrentDataSource<any>
  ) {
    console.log('MAKC:TableControl:handleTableChange:pagination', pagination);

    onChangeCallback({
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      totalCount: pagination.total ?? 0
    });
  }

  const pagination: TablePaginationConfig = useMemo(() =>
    convertToPagination(controlPagination),
    [controlPagination]
  );

  return <Table
    columns={columns}
    rowKey={getRowKeyCallback}
    dataSource={controlRows}
    onChange={handleTableChange}
    pagination={pagination}
    loading={loading}
  />
}
