import { type Key } from 'react';
import { type FormControlFieldType } from '../../../../all';

export interface FormControlField {
  className?: string;
  key?: Key;
  label?: string;
  name?: string;
  type: FormControlFieldType;
}
