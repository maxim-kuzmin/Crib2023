import { type FormControlAction, type FormControlField } from '../../../all';

export interface FormControlProps {
  className?: string;
  controlActions?: FormControlAction[];
  controlFields?: FormControlField[];
  formValues?: any;
  name?: string;
}
