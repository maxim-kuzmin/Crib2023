import { type AppStoreState } from './AppStoreState';
import { AppStoreStatus } from './AppStoreStatus';

export function createAppStoreState<T extends AppStoreState> (
    props: any,
    operationCode = '',
    requestStatus = AppStoreStatus.Fulfilled,
    responseDetails = '',
    responseErrors = '',
    responseStatusCode = 200
    ): T {
    return {
        ...props,
        operationCode,
        requestStatus,
        responseDetails,
        responseErrors,
        responseStatusCode
    };
}

export * from './AppStoreDispatchOptions';
export * from './AppStoreDispatchType';
export * from './AppStoreState';
export * from './AppStoreStatus';
