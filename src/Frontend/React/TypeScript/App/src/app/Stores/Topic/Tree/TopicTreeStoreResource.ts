import { type LocalizationResource } from '../../../Localization';

export interface TopicTreeStoreResource extends LocalizationResource {
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForGetChildren: () => string;
}
