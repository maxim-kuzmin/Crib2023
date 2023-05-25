import { type Dispatch, createContext } from 'react';
import { type TopicItemStoreStateMap } from '../../../../features';
import { type TopicItemStoreActionUnion } from '../TopicItemStoreActionUnion';

export const TopicItemStoreDispatchContext = createContext<
  Dispatch<TopicItemStoreActionUnion> | null
>(null);

export const TopicItemStoreStateContext = createContext<
  TopicItemStoreStateMap | null
>(null);
