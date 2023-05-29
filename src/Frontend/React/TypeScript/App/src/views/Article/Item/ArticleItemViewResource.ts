import { type LocalizationResource } from '../../../common';

export interface ArticleItemViewResource extends LocalizationResource {
  readonly getActionForBackToList: () => string;
  readonly getActionForEdit: () => string;
  readonly getLabelForId: () => string;
  readonly getTitle: () => string;
}
