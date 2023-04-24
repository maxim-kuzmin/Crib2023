export interface ArticleItemEditViewResource {
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
}
