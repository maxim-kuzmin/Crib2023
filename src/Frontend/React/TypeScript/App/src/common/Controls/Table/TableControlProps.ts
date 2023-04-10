import { type Key } from 'react';
import { type TableControlPagination, type TableControlColumn } from '../..';

export interface TableControlProps {
  className?: string;
  controlColumns: TableControlColumn[];
  controlPagination: TableControlPagination;
  controlRows: any[];
  getRowKey: (row: any) => Key;
  onChange: (pagination: TableControlPagination) => void;
  loading: boolean;
}
