import { type NotificationControlProps } from '../Controls';
import { type OperationHandlerConfig } from './OperationHandlerConfig';

export interface OperationHandlerOptions extends OperationHandlerConfig {
  functionToSetNotification: (data: NotificationControlProps) => void;
}
