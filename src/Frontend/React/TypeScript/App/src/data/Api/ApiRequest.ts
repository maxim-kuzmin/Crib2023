export class ApiRequest {
  public operationCode = '';

  constructor (public operationName: string, operationCode?: string) {
    if (operationCode) {
      this.operationCode = operationCode;
    }
  }
}
