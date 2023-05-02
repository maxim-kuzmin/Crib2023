import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type TopicItemStoreState } from '../../../features';
import { type TopicItemStoreActionUnion } from './TopicItemStoreActionUnion';

export const TopicItemStoreDispatchContext = createContext<
  Dispatch<TopicItemStoreActionUnion> | null
>(null);

export function useTopicItemStoreDispatchContext () {
  return useContext(TopicItemStoreDispatchContext)!;
}

export const TopicItemStoreStateContext = createContext<
  Map<string, TopicItemStoreState> | null
>(null);

export function useTopicItemStoreStateContext (
  sliceName: string
): TopicItemStoreState {
  return useContext(TopicItemStoreStateContext)!.get(sliceName)!;
}
