export interface ArticleItemStoreResource {
  readonly getDeleteOperationName: () => string;
  readonly getGetOperationName: () => string;
  readonly getSaveOperationName: () => string;
}
