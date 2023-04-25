import { type LocalizationResource } from '../../../../common';

export interface TopicTreeStoreResource extends LocalizationResource {
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForGetChildren: () => string;
}
