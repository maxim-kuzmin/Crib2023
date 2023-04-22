import { type ConfirmControlType } from './ConfirmControlType';

export interface ConfirmControlProps {
  onCancel?: () => void;
  onOk: () => void;
  content?: string;
  title?: string;
  type: ConfirmControlType;
}
