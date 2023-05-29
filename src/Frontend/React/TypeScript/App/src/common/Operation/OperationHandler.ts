import { v4 as uuidv4 } from 'uuid';
import { type NotificationControlProps, NotificationControlType } from '../Controls';
import { type OperationHandlerConfig, type OperationHandlerResource } from './Handler';
import { type OperationInput } from './OperationInput';
import { type OperationResult } from './OperationResult';

export interface OperationHandler {
  readonly handleError: (error: unknown) => void;
  readonly handleStart: (operationInput: OperationInput) => void;
  readonly handleSuccess: (operationResult: OperationResult) => void;
  readonly operationCode: string;
}

interface Options extends OperationHandlerConfig {
  functionToSetNotification: (data: NotificationControlProps) => void;
  resourceOfOperationHandler: OperationHandlerResource;
}

class Implementation implements OperationHandler {
  private _operationCode = '';

  private operationName = '';

  constructor (private readonly options: Options) {}

  get operationCode () {
    if (!this._operationCode) {
      this._operationCode = uuidv4();
    }

    return this._operationCode;
  }

  handleError (error: unknown) {
    const { functionToSetNotification, shouldBeLogged, shouldBeNotified } = this.options;

    const title = this.createTitle();

    if (shouldBeLogged) {
      console.error(title, error);
    }

    if (shouldBeNotified) {
      functionToSetNotification({
        type: NotificationControlType.Error,
        message: title,
        description: (error instanceof Error) ? error.message : ''
      });
    }
  }

  handleStart ({ operationCode, operationName, input }: OperationInput) {
    const { shouldBeLogged, resourceOfOperationHandler } = this.options;

    if (operationCode) {
      this._operationCode = operationCode;
    }

    this.operationName = operationName;

    const title = this.createTitle();

    if (shouldBeLogged) {
      console.log(`${title}${resourceOfOperationHandler.getStart()}`, input);
    }
  }

  handleSuccess ({ operationCode, data }: OperationResult) {
    const { functionToSetNotification, resourceOfOperationHandler, shouldBeLogged, shouldBeNotified } = this.options;

    if (operationCode) {
      this._operationCode = operationCode;
    }

    const title = this.createTitle();

    if (shouldBeLogged) {
      console.log(`${title}${resourceOfOperationHandler.getSuccess()}`, data);
    }

    if (shouldBeNotified) {
      functionToSetNotification({
        type: NotificationControlType.Success,
        message: title,
      });
    }
  }

  private createTitle (): string {
    const { resourceOfOperationHandler } = this.options;

    const operationName = this.operationName ?? resourceOfOperationHandler.getOperation();

    return `${operationName}. ${resourceOfOperationHandler.getCode()}: ${this.operationCode}. `;
  }
}

export function createOperationHandler (options: Options): OperationHandler {
  return new Implementation(options);
}
