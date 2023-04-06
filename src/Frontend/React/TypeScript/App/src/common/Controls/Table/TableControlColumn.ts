import { type ReactNode, type Key } from 'react';

export interface TableControlColumn {
  field: string;
  key?: Key;
  render?: (value: any) => ReactNode;
  title: string;
}
