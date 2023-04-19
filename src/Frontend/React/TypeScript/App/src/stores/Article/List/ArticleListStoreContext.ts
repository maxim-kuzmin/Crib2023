import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleListStoreState } from '../../../app/Stores';
import { type ArticleListStoreActionUnion } from './ArticleListStoreActionUnion';

type ActionUnion = ArticleListStoreActionUnion;
type StoreState = ArticleListStoreState;
type StoreStateMap = Map<string, StoreState>;

export const ArticleListStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const ArticleListStoreStateContext = createContext<StoreStateMap | null>(null);

export function useArticleListStoreDispatchContext () {
  return useContext(ArticleListStoreDispatchContext)!;
}
export function useArticleListStoreStateContext (sliceName: string): StoreState {
  return useContext(ArticleListStoreStateContext)!.get(sliceName)!;
}
