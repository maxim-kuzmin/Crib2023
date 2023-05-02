import { type LocalizationResource } from '../../../../common';

export interface ArticleListStoreResource extends LocalizationResource {
  readonly getOperationNameForGet: () => string;
}
