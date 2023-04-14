import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleItemStoreState } from '../../../app/Stores';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';

type ActionUnion = ArticleItemStoreActionUnion;
type State = ArticleItemStoreState;
type StateMap = Map<string, State>;

export const ArticleItemStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const ArticleItemStoreStateContext = createContext<StateMap | null>(null);

export function useArticleItemStoreDispatchContext () {
  return useContext(ArticleItemStoreDispatchContext)!;
}
export function useArticleItemStoreStateContext (sliceName: string): State {
  return useContext(ArticleItemStoreStateContext)!.get(sliceName)!;
}
