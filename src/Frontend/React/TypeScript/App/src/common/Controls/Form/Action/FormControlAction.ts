import { type Key } from 'react';
import { type FormControlActionType } from '../../../../all';

export interface FormControlAction {
  className?: string;
  href?: string;
  key: Key;
  onClick?: () => void;
  title: string;
  type: FormControlActionType;
}
