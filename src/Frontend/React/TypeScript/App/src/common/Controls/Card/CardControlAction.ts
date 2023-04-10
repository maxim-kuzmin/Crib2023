import { type Key } from 'react';

export interface CardControlAction {
  className?: string;
  href?: string;
  key: Key;
  onClick?: () => void;
  title: string;
}
