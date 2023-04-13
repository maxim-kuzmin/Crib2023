import { type StoreDispatchType } from '../../all';

export interface StoreActionOptions {
  dispatchType?: StoreDispatchType;
  isCanceled?: boolean;
  sliceName: string;
}
