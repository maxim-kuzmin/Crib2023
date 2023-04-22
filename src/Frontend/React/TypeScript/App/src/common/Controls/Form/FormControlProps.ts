import { type Key } from 'react';
import { type FormControlAction } from './Action';
import { type FormControlField } from './Field';

export interface FormControlProps {
  className?: string;
  classNameForActions?: string;
  controlActions?: FormControlAction[];
  controlFields?: FormControlField[];
  formValues?: any;
  keyForActions?: Key;
  name?: string;
  onFieldsTouched?: (isFieldsTouched: boolean) => void;
  onGetFunctionToResetFields?: (functionToResetFields: () => void) => void;
  onSubmitFailed?: (error: any) => void;
  onSubmitSuccess?: (values: any) => void;
}
