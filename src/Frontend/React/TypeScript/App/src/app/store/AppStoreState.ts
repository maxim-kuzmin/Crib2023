import { type AppStoreStatus } from './AppStoreStatus'

export interface AppStoreState {
    operationCode: string
    requestStatus: AppStoreStatus
    responseDetails: string
    responseErrors: string
    responseStatusCode: number
}
