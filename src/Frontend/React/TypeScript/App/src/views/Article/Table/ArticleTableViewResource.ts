import { type LocalizationResource } from '../../../common';

export interface ArticleTableViewResource extends LocalizationResource {
  readonly getActionForDelete: () => string;
  readonly getActionForDisplay: () => string;
  readonly getActionForEdit: () => string;
  readonly getActionForNew: () => string;
  readonly getLabelForActions: () => string;
  readonly getLabelForId: () => string;
  readonly getLabelForPath: () => string;
  readonly getLabelForTitle: () => string;
  readonly getTitle: () => string;
}
