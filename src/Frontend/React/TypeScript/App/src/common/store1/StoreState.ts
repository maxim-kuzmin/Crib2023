import { StoreStatus } from './StoreStatus'

export interface StoreState {
    operationCode: string;
    requestStatus: StoreStatus;
    responseDetails: string;
    responseErrors: string;
    responseStatusCode: number;
}

export function createStoreState<T extends StoreState> (
  props: any,
  state: StoreState = {
    operationCode: '',
    requestStatus: StoreStatus.Fulfilled,
    responseDetails: '',
    responseErrors: '',
    responseStatusCode: 200
  }): T {
  return {
    ...props,
    ...state
  };
}
