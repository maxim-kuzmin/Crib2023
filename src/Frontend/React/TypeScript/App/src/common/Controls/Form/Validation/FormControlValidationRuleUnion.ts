import {
  type FormControlValidationLengthRule,
  type FormControlValidationRangeRule,
  type FormControlValidationRegexRule,
  type FormControlValidationRequiredRule,
} from './Rules';

export type FormControlValidationRuleUnion =
  | FormControlValidationLengthRule
  | FormControlValidationRangeRule
  | FormControlValidationRegexRule
  | FormControlValidationRequiredRule;
