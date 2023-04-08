import { type Key } from 'react';

export interface CardControlAction {
  className?: string;
  href?: string;
  key: Key;
  onClickCallback?: () => void;
  title: string;
}
