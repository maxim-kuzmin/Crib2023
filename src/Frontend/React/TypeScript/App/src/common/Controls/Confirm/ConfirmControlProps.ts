import { type ConfirmControlType } from './ConfirmControlType';

export interface ConfirmControlProps {
  onCancel?: () => void;
  onOk: () => void;
  title: string;
  type: ConfirmControlType;
}
