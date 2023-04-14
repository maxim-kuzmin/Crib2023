import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type TopicTreeStoreState } from '../../../app';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';

type ActionUnion = TopicTreeStoreActionUnion;
type State = TopicTreeStoreState;
type StateMap = Map<string, State>;

export const TopicTreeStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const TopicTreeStoreStateContext = createContext<StateMap | null>(null);

export function useTopicTreeStoreDispatchContext () {
  return useContext(TopicTreeStoreDispatchContext)!;
}
export function useTopicTreeStoreStateContext (sliceName: string): State {
  return useContext(TopicTreeStoreStateContext)!.get(sliceName)!;
}
