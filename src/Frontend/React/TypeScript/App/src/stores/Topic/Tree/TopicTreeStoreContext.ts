import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type TopicTreeStoreState } from '../../../app';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';

export const TopicTreeStoreDispatchContext = createContext<
  Dispatch<TopicTreeStoreActionUnion> | null
>(null);

export function useTopicTreeStoreDispatchContext () {
  return useContext(TopicTreeStoreDispatchContext)!;
}

export const TopicTreeStoreStateContext = createContext<
  Map<string, TopicTreeStoreState> | null
>(null);

export function useTopicTreeStoreStateContext (
  sliceName: string
): TopicTreeStoreState {
  return useContext(TopicTreeStoreStateContext)!.get(sliceName)!;
}
