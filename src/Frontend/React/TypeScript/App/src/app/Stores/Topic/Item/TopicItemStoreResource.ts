import { type LocalizationResource } from '../../../Localization';

export interface TopicItemStoreResource extends LocalizationResource {
  readonly getOperationNameForDelete: () => string;
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForSave: () => string;
}
