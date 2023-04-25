import { type LocalizationResource } from '../../../Localization';

export interface ArticleListStoreResource extends LocalizationResource {
  readonly getOperationNameForGet: () => string;
}
