import { type SelectControlOption } from './SelectControlOption';
import { type ControlProps } from '../..';

export interface SelectControlProps extends ControlProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectControlOption[];
}
