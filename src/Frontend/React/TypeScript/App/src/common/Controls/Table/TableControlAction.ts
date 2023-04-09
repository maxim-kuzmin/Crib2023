import { type Key } from 'react';

export interface TableControlAction {
  className?: string;
  href?: string;
  key: Key;
  onClickCallback?: () => void;
  title: string;
}
