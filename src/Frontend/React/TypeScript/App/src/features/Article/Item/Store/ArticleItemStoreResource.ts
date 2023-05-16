import { type LocalizationResource } from '../../../../common';

export interface ArticleItemStoreResource extends LocalizationResource {
  readonly getOperationNameForDelete: () => string;
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForSave: () => string;
}
