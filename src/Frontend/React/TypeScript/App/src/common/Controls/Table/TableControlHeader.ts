import { type ReactNode } from 'react';

export interface TableControlHeader {
  render?: (title?: string) => ReactNode;
  title?: string;
}
