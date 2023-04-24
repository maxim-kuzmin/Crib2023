export interface ArticleTableViewResource {
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
