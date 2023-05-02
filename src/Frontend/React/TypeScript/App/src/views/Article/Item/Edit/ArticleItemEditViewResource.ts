import { type LocalizationResource } from '../../../../common';

export interface ArticleItemEditViewResource extends LocalizationResource {
  readonly getTitleForEdit: () => string;
  readonly getTitleForNew: () => string;
  readonly getActionForBackToList: () => string;
  readonly getLabelForBody: () => string;
  readonly getActionForDisplay: () => string;
  readonly getLabelForId: () => string;
  readonly getActionForReset: () => string;
  readonly getActionForSave: () => string;
  readonly getLabelForTitle: () => string;
  readonly getLabelForTopic: () => string;
  readonly getValidationMessageForTitleRequired: () => string;
}

export function getArticleItemEditViewResourcePath (): string {
  return 'views/Article/Item/Edit/ArticleItemEditView';
}
