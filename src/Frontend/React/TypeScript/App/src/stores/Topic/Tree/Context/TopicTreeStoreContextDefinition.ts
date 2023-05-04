import { type Dispatch, createContext } from 'react';
import { type TopicTreeStoreState } from '../../../../features';
import { type TopicTreeStoreActionUnion } from '../TopicTreeStoreActionUnion';

export const TopicTreeStoreDispatchContext = createContext<
  Dispatch<TopicTreeStoreActionUnion> | null
>(null);

export const TopicTreeStoreStateContext = createContext<
  Map<string, TopicTreeStoreState> | null
>(null);
