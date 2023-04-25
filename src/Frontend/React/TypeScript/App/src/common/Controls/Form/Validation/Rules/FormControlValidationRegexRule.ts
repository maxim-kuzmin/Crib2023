import { type FormControlValidationRule } from '../FormControlValidationRule';
import { type FormControlValidationRuleType } from '../FormControlValidationRuleType';

export interface FormControlValidationRegexRule extends FormControlValidationRule {
  pattern: RegExp;
  type: FormControlValidationRuleType.Regex;
}
