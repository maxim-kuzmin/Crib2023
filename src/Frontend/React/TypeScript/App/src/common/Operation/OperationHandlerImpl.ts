import { v4 as uuidv4 } from 'uuid';
import { NotificationControlType } from '../Controls';
import { type OperationHandler } from './OperationHandler';
import { type OperationHandlerOptions } from './OperationHandlerOptions';
import { type OperationInput } from './OperationInput';
import { type OperationResult } from './OperationResult';

export class OperationHandlerImpl implements OperationHandler {
  private _operationCode = '';

  private operationName = '';

  constructor (private readonly options: OperationHandlerOptions) {}

  get operationCode () {
    if (!this._operationCode) {
      this._operationCode = uuidv4();
    }

    return this._operationCode;
  }

  handleError (error: any) {
    const { functionToSetNotification, shouldBeLogged, shouldBeNotified } = this.options;

    const title = this.createTitle();

    if (shouldBeLogged) {
      console.error(title, error);
    }

    if (shouldBeNotified) {
      functionToSetNotification({
        type: NotificationControlType.Error,
        message: title,
        description: error.message
      });
    }
  }

  handleStart ({ operationCode, operationName, input }: OperationInput) {
    const { shouldBeLogged } = this.options;

    if (operationCode) {
      this._operationCode = operationCode;
    }

    this.operationName = operationName;

    const title = this.createTitle();

    if (shouldBeLogged) {
      console.log(`${title}Start`, input);
    }
  }

  handleSuccess ({ operationCode, data }: OperationResult) {
    const { functionToSetNotification, shouldBeLogged, shouldBeNotified } = this.options;

    if (operationCode) {
      this._operationCode = operationCode;
    }

    const title = this.createTitle();

    if (shouldBeLogged) {
      console.log(`${title}Success`, data);
    }

    if (shouldBeNotified) {
      functionToSetNotification({
        type: NotificationControlType.Success,
        message: title,
      });
    }
  }

  private createTitle (): string {
    return `${this.operationName ?? 'Operation'}. Code: ${this.operationCode}. `
  }
}
