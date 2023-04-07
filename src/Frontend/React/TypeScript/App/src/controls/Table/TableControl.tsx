import React, { useMemo } from 'react';
import { Table } from 'antd';
import { type TablePaginationConfig, type ColumnsType } from 'antd/es/table';
import {
  type TableControlPagination,
  type TableControlColumn,
  type TableControlProps,
  getModule
} from '../../all';
import {
  type TableCurrentDataSource,
  type FilterValue,
  type SorterResult,
  type ColumnType
} from 'antd/es/table/interface';

function convertToColumns (controlColumns: TableControlColumn[]): ColumnsType<any> {
  return controlColumns.map((controlColumn) => {
    const { field, key, render, title } = controlColumn;
    const result: ColumnType<any> = {
      dataIndex: field,
      key,
      title
    };

    if (render) {
      result.render = (value: any, record: any, index: number) => render(record);
    }

    return result;
  });
}

function convertToPagination (
  controlPagination: TableControlPagination,
  paginationConfig: TablePaginationConfig
): TablePaginationConfig {
  const { pageNumber, pageSize, totalCount } = controlPagination;

  return {
    ...paginationConfig,
    current: pageNumber,
    pageSize,
    total: totalCount
  };
}

export const TableControl: React.FC<TableControlProps> = ({
  controlColumns,
  controlPagination,
  controlRows,
  getRowKeyCallback,
  onChangeCallback,
  loading
}: TableControlProps) => {
  const columns = useMemo(() => convertToColumns(controlColumns), [controlColumns]);

  const { defaultPageSize } = getModule().getTableControlService();

  const paginationConfig: TablePaginationConfig = useMemo(() => ({
      defaultPageSize,
      showTotal: (total, range) => `${range[0]}-${range[1]} @@From ${total}`,
      pageSizeOptions: [10, 20, 50, 100, 1000000],
      position: ['bottomLeft', 'topLeft'],
      size: 'small',
      hideOnSinglePage: false,
      locale: { items_per_page: '@@PerPage' },
    }),
    [defaultPageSize]
  );

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
    convertToPagination(controlPagination, paginationConfig),
    [controlPagination, paginationConfig]
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
