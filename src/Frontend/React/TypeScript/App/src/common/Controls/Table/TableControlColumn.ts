import { type ReactNode, type Key } from 'react';
import { type TableControlHeader } from './TableControlHeader';

export interface TableControlColumn {
  field?: string;
  header?: TableControlHeader;
  key?: Key;
  render?: (row: any) => ReactNode;
}
