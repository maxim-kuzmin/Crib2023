import { type LocalizationResource } from '../../../app';

export interface ArticleItemViewResource extends LocalizationResource {
  readonly getActionForBackToList: () => string;
  readonly getActionForEdit: () => string;
  readonly getLabelForId: () => string;
  readonly getTitle: () => string;
}
