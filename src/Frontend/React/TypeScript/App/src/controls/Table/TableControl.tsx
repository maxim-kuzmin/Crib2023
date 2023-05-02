import React, { type ReactNode, useMemo, memo } from 'react';
import { Table } from 'antd';
import {
  type TablePaginationConfig,
  type ColumnsType
} from 'antd/es/table';
import {
  type TableCurrentDataSource,
  type FilterValue,
  type SorterResult,
  type ColumnType
} from 'antd/es/table/interface';
import { useApp } from '../../app';
import {
  type TableControlColumn,
  type TableControlHeader,
  type TableControlPagination,
  type TableControlProps
} from '../../common';

function convertHeaderToTitle (header: TableControlHeader): ReactNode | undefined {
  const { render, title } = header;

  return render ? render(title) : title;
}

function convertToColumns (controlColumns: TableControlColumn[]): ColumnsType<any> {
  return controlColumns.map((controlColumn) => {
    const { field, key, render, header } = controlColumn;

    let title: ReactNode;

    if (header) {
      title = convertHeaderToTitle(header);
    }

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

export const TableControl: React.FC<TableControlProps> = memo(
function TableControl ({
  className,
  controlColumns,
  controlPagination,
  controlRows,
  getRowKey,
  onChange,
  loading
}: TableControlProps): React.ReactElement<TableControlProps> | null {
  const { hooks, module } = useApp();

  const resourceOfTableControl = hooks.Controls.Table.useResource();

  const columns = useMemo(
    () => convertToColumns(controlColumns),
    [controlColumns]
  );

  const { defaultPageSize } = module.Common.Controls.Table.getService();

  const tPaginationPartForFrom = resourceOfTableControl.getPaginationPartForFrom();
  const tPaginationPartForPerPage = resourceOfTableControl.getPaginationPartForPerPage();
  const tPaginationPartForJumpTo = resourceOfTableControl.getPaginationPartForJumpTo();
  const tPaginationPartForPageTo = resourceOfTableControl.getPaginationPartForPageTo();
  const tPaginationPartForPrevPage = resourceOfTableControl.getPaginationPartForPrevPage();
  const tPaginationPartForNextPage = resourceOfTableControl.getPaginationPartForNextPage();
  const tPaginationPartForPrev5Pages = resourceOfTableControl.getPaginationPartForPrev5Pages();
  const tPaginationPartForNext5Pages = resourceOfTableControl.getPaginationPartForNext5Pages();
  const tPaginationPartForPrev3Pages = resourceOfTableControl.getPaginationPartForPrev3Pages();
  const tPaginationPartForNext3Pages = resourceOfTableControl.getPaginationPartForNext3Pages();

  const paginationConfig: TablePaginationConfig = useMemo(
    () => {
      const result: TablePaginationConfig = {
        defaultPageSize,
        showTotal: (total, range) => `${range[0]}-${range[1]} ${tPaginationPartForFrom} ${total}`,
        pageSizeOptions: [10, 20, 50, 100, 1000000],
        position: ['bottomLeft', 'topLeft'],
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'small',
        hideOnSinglePage: false,
        locale: {
          items_per_page: tPaginationPartForPerPage,
          jump_to: tPaginationPartForJumpTo,
          // jump_to_confirm?: string;
          page: tPaginationPartForPageTo,
          prev_page: tPaginationPartForPrevPage,
          next_page: tPaginationPartForNextPage,
          prev_5: tPaginationPartForPrev5Pages,
          next_5: tPaginationPartForNext5Pages,
          prev_3: tPaginationPartForPrev3Pages,
          next_3: tPaginationPartForNext3Pages
        },
      };

      return result;
    },
    [
      defaultPageSize,
      tPaginationPartForFrom,
      tPaginationPartForPerPage,
      tPaginationPartForJumpTo,
      tPaginationPartForPageTo,
      tPaginationPartForPrevPage,
      tPaginationPartForNextPage,
      tPaginationPartForPrev5Pages,
      tPaginationPartForNext5Pages,
      tPaginationPartForPrev3Pages,
      tPaginationPartForNext3Pages,
    ]
  );

  function handleTableChange (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | Array<SorterResult<any>>,
    extra: TableCurrentDataSource<any>
  ) {
    onChange({
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      totalCount: pagination.total ?? 0
    });
  }

  const pagination: TablePaginationConfig = useMemo(
    () => convertToPagination(controlPagination, paginationConfig),
    [controlPagination, paginationConfig]
  );

  return (
    <Table
      className={className}
      columns={columns}
      rowKey={getRowKey}
      dataSource={controlRows}
      onChange={handleTableChange}
      pagination={pagination}
      loading={loading}
    />
  );
});
