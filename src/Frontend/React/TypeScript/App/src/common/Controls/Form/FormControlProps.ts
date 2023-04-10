import { type Key } from 'react';
import { type FormControlAction, type FormControlField } from '../../../all';

export interface FormControlProps {
  className?: string;
  classNameForActions?: string;
  controlActions?: FormControlAction[];
  controlFields?: FormControlField[];
  formValues?: any;
  keyForActions?: Key;
  name?: string;
}
