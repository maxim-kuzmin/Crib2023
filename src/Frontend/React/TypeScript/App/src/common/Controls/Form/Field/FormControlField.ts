import { type Key } from 'react';
import { type FormControlValidationRuleUnion } from '../Validation';
import { type FormControlFieldType } from './FormControlFieldType';

export interface FormControlField {
  children?: FormControlField[];
  className?: string;
  key?: Key;
  label?: string;
  name?: string;
  type: FormControlFieldType;
  validationRules?: FormControlValidationRuleUnion[];
}
