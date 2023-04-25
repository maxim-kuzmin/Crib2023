import { type FormControlValidationRule } from '../FormControlValidationRule';
import { type FormControlValidationRuleType } from '../FormControlValidationRuleType';

export interface FormControlValidationLengthRule extends FormControlValidationRule {
  length: number;
  type: FormControlValidationRuleType.Length;
}
