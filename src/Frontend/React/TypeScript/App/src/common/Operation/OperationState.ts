import { OperationStatus } from '../../all';

export interface OperationState {
  readonly status?: OperationStatus;
}

export function createOperationState<T extends OperationState> (
  extension: any,
  state: OperationState = {}
): T {
  let {
    status
  } = state;

  if (!status) {
    status = OperationStatus.Fulfilled;
  }

  return {
    ...extension
  };
}
