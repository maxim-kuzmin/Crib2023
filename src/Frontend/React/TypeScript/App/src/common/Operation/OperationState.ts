import { OperationStatus } from './OperationStatus';

export interface OperationState {
  readonly status?: OperationStatus;
}

export function createOperationState<T extends OperationState> (
  extension: T,
  state: OperationState = {}
): T {
  let {
    status
  } = state;

  if (!status) {
    status = OperationStatus.Initial;
  }

  return {
    ...extension,
    ...state,
    status
  };
}
