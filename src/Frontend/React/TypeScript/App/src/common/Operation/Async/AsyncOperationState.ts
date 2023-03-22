import { AsyncOperationStatus } from '../../../all';

export interface AsyncOperationState {
  readonly status?: AsyncOperationStatus;
}

export function createAsyncOperationState<T extends AsyncOperationState> (
  extension: any,
  state: AsyncOperationState = {}
): T {
  let {
    status
  } = state;

  if (!status) {
    status = AsyncOperationStatus.Fulfilled;
  }

  return {
    ...extension
  };
}
