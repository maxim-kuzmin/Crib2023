import { v4 as uuidv4 } from 'uuid';
import { NotificationType, type NotificationData, type OperationConfig } from '../../all';

export interface OperationHandler {
  readonly handleError: (error: any) => void;
  readonly handleStart: (request: OperationConfig) => void;
  readonly handleSuccess: (response: any) => void;
}

export class OperationHandlerImpl implements OperationHandler {
  private _operationCode = '';

  private title = '';

  constructor (private readonly functionToSetNotification: (data: NotificationData) => void) {}

  get operationCode () {
    return this._operationCode;
  }

  handleError (error: any) {
    console.error(`${this.title}Error`, error);

    this.functionToSetNotification({
      type: NotificationType.Error,
      message: this.title,
      description: error.message
    });
  }

  handleStart (config: OperationConfig, requestInput?: any) {
    this._operationCode = config.operationCode ?? uuidv4();

    this.title = `${config.operationName}. Code: ${this.operationCode}. `;

    console.log(`${this.title}Start`, requestInput);
  }

  handleSuccess (responseData?: any) {
    console.log(`${this.title}Success`, responseData);

    this.functionToSetNotification({
      type: NotificationType.Success,
      message: this.title,
    });
  }
}
