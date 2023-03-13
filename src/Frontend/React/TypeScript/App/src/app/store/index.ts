import { type AppStoreState } from './AppStoreState';
import { AppStoreStatus } from './AppStoreStatus';

function createState<T extends AppStoreState> (
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

function getFalse () {
    return false;
}

const appStore = {
    createState,
    getFalse
};

export default appStore;

export * from './AppStoreDispatchOptions';
export * from './AppStoreDispatchType';
export * from './AppStoreState';
export * from './AppStoreStatus';
