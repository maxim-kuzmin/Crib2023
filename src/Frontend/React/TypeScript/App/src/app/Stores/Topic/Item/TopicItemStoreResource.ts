export interface TopicItemStoreResource {
  readonly getOperationNameForDelete: () => string;
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForSave: () => string;
}
