import { v4 as uuidv4 } from 'uuid';
import {
  NotificationType,
  type OperationInput,
  type OperationResult,
  type NotificationData
} from '../../all';

export interface OperationHandler {
  readonly handleError: (error: any) => void;
  readonly handleStart: (operationInput: OperationInput) => void;
  readonly handleSuccess: (operationResult: OperationResult) => void;
  readonly operationCode: string;
}

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

    console.error(`${title}Error`, error);

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
