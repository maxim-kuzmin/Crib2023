import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleListStoreState } from '../../../app';
import { type ArticleListStoreActionUnion } from './ArticleListStoreActionUnion';

type ActionUnion = ArticleListStoreActionUnion;
type State = ArticleListStoreState;
type StateMap = Map<string, State>;

export const ArticleListStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const ArticleListStoreStateContext = createContext<StateMap | null>(null);

export function useArticleListStoreDispatchContext () {
  return useContext(ArticleListStoreDispatchContext)!;
}
export function useArticleListStoreStateContext (sliceName: string): State {
  return useContext(ArticleListStoreStateContext)!.get(sliceName)!;
}
