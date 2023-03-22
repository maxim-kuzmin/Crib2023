import { StoreStatus } from '../../all';

export interface StoreState {
  readonly status?: StoreStatus;
}

export function createStoreState<T extends StoreState> (props: any, state: StoreState = {}): T {
  let {
    status
  } = state;

  if (!status) {
    status = StoreStatus.Fulfilled;
  }

  return {
    ...props
  };
}
