import { v4 as uuidv4 } from 'uuid';
import { NotificationType, type NotificationData } from '../Notification';

export interface ApiRequestHandler {
    readonly onError: (error: Error) => any;
}

export class ApiRequestHandlerImpl implements ApiRequestHandler {
  private _operationCode = uuidv4();
  private title: string;

  get operationCode (): string {
    return this._operationCode;
  }

  constructor (
    private readonly operationName: string,
    private readonly functionToSetNotification: (data: NotificationData) => void
  ) {
    this.title = this.createTitle();
  }

  onStart (request: Request, operationCode?: string) {
    if (operationCode) {
      this._operationCode = operationCode;

      this.title = this.createTitle();
    }

    console.log(this.title, request);
  }

  onSuccess (response: Response) {
    console.log(this.title, response);

    if (response.ok) {
      this.functionToSetNotification({
        type: NotificationType.Success,
        message: this.title,
      });
    } else {
      let message = response.statusText ?? 'Unknown';

      switch (response.status) {
        case 400:
          message = '@@status-text-400';
          break;
        case 404:
          message = '@@status-text-404';
          break;
        case 500:
          message = '@@status-text-500';
          break;
      }

      throw new Error(message);
    }
  }

  onError (error: Error) {
    console.error(this.title, error);

    this.functionToSetNotification({
      type: NotificationType.Error,
      message: this.title,
      description: error.message
    });
  }

  private createTitle () {
    return `${this.operationName}: ${this.operationCode}`
  }
}
