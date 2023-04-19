import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type TopicItemStoreState } from '../../../app/Stores';
import { type TopicItemStoreActionUnion } from './TopicItemStoreActionUnion';

type ActionUnion = TopicItemStoreActionUnion;
type StoreState = TopicItemStoreState;
type StoreStateMap = Map<string, StoreState>;

export const TopicItemStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const TopicItemStoreStateContext = createContext<StoreStateMap | null>(null);

export function useTopicItemStoreDispatchContext () {
  return useContext(TopicItemStoreDispatchContext)!;
}
export function useTopicItemStoreStateContext (sliceName: string): StoreState {
  return useContext(TopicItemStoreStateContext)!.get(sliceName)!;
}
