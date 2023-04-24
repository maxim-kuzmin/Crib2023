export interface TopicItemStoreResource {
  readonly getDeleteOperationName: () => string;
  readonly getGetOperationName: () => string;
  readonly getSaveOperationName: () => string;
}
