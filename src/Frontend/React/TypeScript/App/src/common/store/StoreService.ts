import { type StoreState } from './StoreState';
import { StoreStatus } from './StoreStatus';

function createState<T extends StoreState> (
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

function getFalse () {
    return false;
}

export interface StoreService {
  readonly createState: <T extends StoreState>(
    props: any,
    state?: StoreState
  ) => T;
  readonly getFalse: () => boolean;
}

const service: StoreService = {
    createState,
    getFalse
};

export function getStoreService (): StoreService {
  return service;
}
