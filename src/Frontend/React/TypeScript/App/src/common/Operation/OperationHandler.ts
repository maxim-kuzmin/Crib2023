export interface OperationHandler {
  readonly onError: (error: any) => any;
  readonly onStart: (request: any) => any;
  readonly onSuccess: (response: any) => any;
}
