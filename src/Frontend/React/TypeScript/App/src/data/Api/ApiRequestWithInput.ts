import { ApiRequest } from '../../all';

export class ApiRequestWithInput<TInput> extends ApiRequest {
  constructor (operationName: string, public input: TInput, operationCode?: string) {
    super(operationName, operationCode);
  }
}
