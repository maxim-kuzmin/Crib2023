import {
  StoreStatus,
  type ApiResponseDetailsData,
  type ApiResponseErrorsData
} from '../../all';

export interface StoreState {
  readonly operationCode?: string;
  readonly requestStatus?: StoreStatus;
  readonly responseDetailsData?: ApiResponseDetailsData | null;
  readonly responseErrorsData?: ApiResponseErrorsData | null;
  readonly responseStatusCode?: number;
}

export function createStoreState<T extends StoreState> (props: any, state: StoreState = {}): T {
  let {
    operationCode,
    requestStatus,
    responseDetailsData,
    responseErrorsData,
    responseStatusCode
  } = state;

  if (!operationCode) {
    operationCode = ''
  }

  if (!requestStatus) {
    requestStatus = StoreStatus.Fulfilled;
  }

  if (!responseDetailsData) {
    responseDetailsData = null;
  }

  if (!responseErrorsData) {
    responseErrorsData = null;
  }

  if (!responseStatusCode) {
    responseStatusCode = 200;
  }

  return {
    operationCode,
    requestStatus,
    responseDetailsData,
    responseErrorsData,
    responseStatusCode,
    ...props
  };
}
