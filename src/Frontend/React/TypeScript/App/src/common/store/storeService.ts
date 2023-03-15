import { type StoreState } from './StoreState';
import { StoreStatus } from './StoreStatus';

function createState<T extends StoreState> (
    props: any,
    operationCode = '',
    requestStatus = StoreStatus.Fulfilled,
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

export const storeService = {
    createState,
    getFalse
};
