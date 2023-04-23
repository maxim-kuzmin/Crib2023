import React, { type ReactNode, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('controls/Table/TableControl');

  const tFrom: string = t('@@from');
  const tJumpTo: string = t('@@Jump_to');
  const tNext3Pages: string = t('@@Next_3_pages');
  const tNext5Pages: string = t('@@Next_5_pages');
  const tNextPage: string = t('@@Next_page');
  const tPageTo: string = t('@@page_to');
  const tPerPage: string = t('@@per_page');
  const tPrev3Pages: string = t('@@Prev_3_pages');
  const tPrev5Pages: string = t('@@Prev_5_pages');
  const tPrevPage: string = t('@@Prev_page');

  const columns = useMemo(
    () => convertToColumns(controlColumns),
    [controlColumns]
  );

  const { defaultPageSize } = getModule().getTableControlService();

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      defaultPageSize,
      showTotal: (total, range) => `${range[0]}-${range[1]} ${tFrom} ${total}`,
      pageSizeOptions: [10, 20, 50, 100, 1000000],
      position: ['bottomLeft', 'topLeft'],
      showQuickJumper: true,
      showSizeChanger: true,
      size: 'small',
      hideOnSinglePage: false,
      locale: {
        items_per_page: tPerPage,
        jump_to: tJumpTo,
        // jump_to_confirm?: string;
        page: tPageTo,
        prev_page: tPrevPage,
        next_page: tNextPage,
        prev_5: tPrev5Pages,
        next_5: tNext5Pages,
        prev_3: tPrev3Pages,
        next_3: tNext3Pages
      },
    }),
    [
      defaultPageSize,
      tFrom,
      tJumpTo,
      tNext3Pages,
      tNext5Pages,
      tNextPage,
      tPageTo,
      tPerPage,
      tPrev3Pages,
      tPrev5Pages,
      tPrevPage
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
