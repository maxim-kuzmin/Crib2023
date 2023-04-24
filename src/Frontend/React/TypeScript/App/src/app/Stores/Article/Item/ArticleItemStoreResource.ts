export interface ArticleItemStoreResource {
  readonly getOperationNameForDelete: () => string;
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForSave: () => string;
}
