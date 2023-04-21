import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleItemStoreState } from '../../../app/Stores';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';

export const ArticleItemStoreDispatchContext = createContext<Dispatch<ArticleItemStoreActionUnion> | null>(null);
export const ArticleItemStoreStateContext = createContext<Map<string, ArticleItemStoreState> | null>(null);

export function useArticleItemStoreDispatchContext () {
  return useContext(ArticleItemStoreDispatchContext)!;
}
export function useArticleItemStoreStateContext (sliceName: string): ArticleItemStoreState {
  return useContext(ArticleItemStoreStateContext)!.get(sliceName)!;
}
