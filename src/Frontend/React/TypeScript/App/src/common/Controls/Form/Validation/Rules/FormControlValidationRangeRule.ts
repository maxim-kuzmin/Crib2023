import { type FormControlValidationDataType } from '../FormControlValidationDataType';
import { type FormControlValidationRule } from '../FormControlValidationRule';
import { type FormControlValidationRuleType } from '../FormControlValidationRuleType';

export interface FormControlValidationRangeRule extends FormControlValidationRule {
  dataType?: FormControlValidationDataType;
  max?: number;
  min?: number;
  type: FormControlValidationRuleType.Range;
}
