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
import { getModule } from '../../app';
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
}: TableControlProps) {
  const hooksOfTableControl = getModule().getTableControlHooks();

  const resourceOfTableControl = hooksOfTableControl.useResource();

  const columns = useMemo(
    () => convertToColumns(controlColumns),
    [controlColumns]
  );

  const { defaultPageSize } = getModule().getTableControlService();

  const paginationConfig: TablePaginationConfig = useMemo(
    () => {
      const tPaginationPartForFrom = resourceOfTableControl.getPaginationPartForFrom();

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
          items_per_page: resourceOfTableControl.getPaginationPartForPerPage(),
          jump_to: resourceOfTableControl.getPaginationPartForJumpTo(),
          // jump_to_confirm?: string;
          page: resourceOfTableControl.getPaginationPartForPageTo(),
          prev_page: resourceOfTableControl.getPaginationPartForPrevPage(),
          next_page: resourceOfTableControl.getPaginationPartForNextPage(),
          prev_5: resourceOfTableControl.getPaginationPartForPrev5Pages(),
          next_5: resourceOfTableControl.getPaginationPartForNext5Pages(),
          prev_3: resourceOfTableControl.getPaginationPartForPrev3Pages(),
          next_3: resourceOfTableControl.getPaginationPartForNext3Pages()
        },
      };

      return result;
    },
    [
      defaultPageSize,
      resourceOfTableControl,
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
