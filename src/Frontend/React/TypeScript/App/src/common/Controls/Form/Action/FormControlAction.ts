import { type Key } from 'react';
import { type FormControlActionType } from './FormControlActionType';

export interface FormControlAction {
  className?: string;
  disabled?: boolean;
  href?: string;
  key: Key;
  loading?: boolean;
  onClick?: () => void;
  title: string;
  type: FormControlActionType;
}
