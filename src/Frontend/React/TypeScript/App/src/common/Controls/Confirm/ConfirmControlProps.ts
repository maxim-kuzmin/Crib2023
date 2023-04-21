import { type ConfirmControlType } from './ConfirmControlType';

export interface ConfirmControlProps {
  onOk: () => void;
  onCancel: () => void;
  title: string;
  type: ConfirmControlType;
}
