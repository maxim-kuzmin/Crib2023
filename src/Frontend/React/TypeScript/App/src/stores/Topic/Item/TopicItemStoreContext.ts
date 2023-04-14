import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type TopicItemStoreState } from '../../../app';
import { type TopicItemStoreActionUnion } from './TopicItemStoreActionUnion';

type ActionUnion = TopicItemStoreActionUnion;
type State = TopicItemStoreState;
type StateMap = Map<string, State>;

export const TopicItemStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const TopicItemStoreStateContext = createContext<StateMap | null>(null);

export function useTopicItemStoreDispatchContext () {
  return useContext(TopicItemStoreDispatchContext)!;
}
export function useTopicItemStoreStateContext (sliceName: string): State {
  return useContext(TopicItemStoreStateContext)!.get(sliceName)!;
}
