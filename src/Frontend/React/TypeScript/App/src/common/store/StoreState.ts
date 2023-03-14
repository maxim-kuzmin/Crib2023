import { type StoreStatus } from './StoreStatus'

export interface StoreState {
    operationCode: string
    requestStatus: StoreStatus
    responseDetails: string
    responseErrors: string
    responseStatusCode: number
}
