import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type TopicTreeStoreState } from '../../../app/Stores';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';

type ActionUnion = TopicTreeStoreActionUnion;
type StoreState = TopicTreeStoreState;
type StoreStateMap = Map<string, StoreState>;

export const TopicTreeStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const TopicTreeStoreStateContext = createContext<StoreStateMap | null>(null);

export function useTopicTreeStoreDispatchContext () {
  return useContext(TopicTreeStoreDispatchContext)!;
}
export function useTopicTreeStoreStateContext (sliceName: string): StoreState {
  return useContext(TopicTreeStoreStateContext)!.get(sliceName)!;
}
