import { v4 as uuidv4 } from 'uuid';
import {
  NotificationType,
  type OperationHandler,
  type OperationInput,
  type OperationResult,
  type NotificationData
} from '../../all';

export class OperationHandlerImpl implements OperationHandler {
  private _operationCode = '';

  private operationName = '';

  constructor (private readonly functionToSetNotification: (data: NotificationData) => void) {}

  get operationCode () {
    if (!this._operationCode) {
      this._operationCode = uuidv4();
    }

    return this._operationCode;
  }

  handleError (error: any) {
    const title = this.createTitle();

    console.error(title, error);

    this.functionToSetNotification({
      type: NotificationType.Error,
      message: title,
      description: error.message
    });
  }

  handleStart ({ operationCode, operationName, input }: OperationInput) {
    if (operationCode) {
      this._operationCode = operationCode;
    }

    this.operationName = operationName;

    const title = this.createTitle();

    console.log(`${title}Start`, input);
  }

  handleSuccess ({ operationCode, data }: OperationResult) {
    if (operationCode) {
      this._operationCode = operationCode;
    }

    const title = this.createTitle();

    console.log(`${title}Success`, data);

    this.functionToSetNotification({
      type: NotificationType.Success,
      message: title,
    });
  }

  private createTitle (): string {
    return `${this.operationName ?? 'Operation'}. Code: ${this.operationCode}. `
  }
}
