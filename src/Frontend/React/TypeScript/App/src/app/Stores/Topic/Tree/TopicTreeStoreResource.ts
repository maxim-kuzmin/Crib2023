export interface TopicTreeStoreResource {
  readonly getOperationNameForGet: () => string;
  readonly getOperationNameForGetChildren: () => string;
}
