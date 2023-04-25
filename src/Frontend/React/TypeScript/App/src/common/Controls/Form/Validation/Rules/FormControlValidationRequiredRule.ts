import { type FormControlValidationRule } from '../FormControlValidationRule';
import { type FormControlValidationRuleType } from '../FormControlValidationRuleType';

export interface FormControlValidationRequiredRule extends FormControlValidationRule {
  type: FormControlValidationRuleType.Required;
  whitespace?: boolean;
}
