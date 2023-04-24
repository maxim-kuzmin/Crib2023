import { type ConfirmControlResource } from '../../../controls';
import { type ConfirmControlType } from './ConfirmControlType';

export interface ConfirmControlProps {
  onCancel?: () => void;
  onOk: () => void;
  content?: string;
  resourceOfConfirmControl: ConfirmControlResource;
  title?: string;
  type: ConfirmControlType;
}
