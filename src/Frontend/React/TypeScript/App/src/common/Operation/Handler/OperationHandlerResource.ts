import { type LocalizationResource } from '../../Localization';

export interface OperationHandlerResource extends LocalizationResource {
  readonly getCode: () => string;
  readonly getOperation: () => string;
  readonly getStart: () => string;
  readonly getSuccess: () => string;
}
