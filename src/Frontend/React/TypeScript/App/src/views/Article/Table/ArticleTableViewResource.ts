import { type LocalizationResource } from '../../../app';

export interface ArticleTableViewResource extends LocalizationResource {
  readonly getTitle: () => string;
  readonly getLabelForActions: () => string;
  readonly getActionForDelete: () => string;
  readonly getActionForDisplay: () => string;
  readonly getActionForEdit: () => string;
  readonly getLabelForId: () => string;
  readonly getActionForNew: () => string;
  readonly getLabelForPath: () => string;
  readonly getLabelForTitle: () => string;
}
