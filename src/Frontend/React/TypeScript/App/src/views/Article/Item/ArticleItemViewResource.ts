export interface ArticleItemViewResource {
  readonly getActionForBackToList: () => string;
  readonly getActionForEdit: () => string;
  readonly getLabelForId: () => string;
  readonly getTitle: () => string;
}
