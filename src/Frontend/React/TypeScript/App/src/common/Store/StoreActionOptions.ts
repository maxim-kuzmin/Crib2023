import { type StoreDispatchType } from './StoreDispatchType';

export interface StoreActionOptions {
  dispatchType?: StoreDispatchType;
  isCanceled?: boolean;
}
