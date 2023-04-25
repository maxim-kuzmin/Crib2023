import { type LocalizationResource } from '../../../../common';

export interface TopicItemStoreResource extends LocalizationResource {
  readonly getOperationNameForDelete: () => string;
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForSave: () => string;
}
