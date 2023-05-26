import { type StoreDispatchType } from '../StoreDispatchType';

export interface StoreActionOptions {
  readonly dispatchType?: StoreDispatchType;
  readonly abortController?: AbortController;
}
