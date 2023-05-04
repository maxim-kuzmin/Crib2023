import { type Dispatch, createContext } from 'react';
import { type TopicItemStoreState } from '../../../../features';
import { type TopicItemStoreActionUnion } from '../TopicItemStoreActionUnion';

export const TopicItemStoreDispatchContext = createContext<
  Dispatch<TopicItemStoreActionUnion> | null
>(null);

export const TopicItemStoreStateContext = createContext<
  Map<string, TopicItemStoreState> | null
>(null);
