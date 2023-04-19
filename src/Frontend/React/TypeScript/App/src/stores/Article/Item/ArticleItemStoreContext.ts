import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleItemStoreState } from '../../../app/Stores';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';

type ActionUnion = ArticleItemStoreActionUnion;
type StoreState = ArticleItemStoreState;
type StoreStateMap = Map<string, StoreState>;

export const ArticleItemStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const ArticleItemStoreStateContext = createContext<StoreStateMap | null>(null);

export function useArticleItemStoreDispatchContext () {
  return useContext(ArticleItemStoreDispatchContext)!;
}
export function useArticleItemStoreStateContext (sliceName: string): StoreState {
  return useContext(ArticleItemStoreStateContext)!.get(sliceName)!;
}
