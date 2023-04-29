import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleItemStoreState } from '../../../app';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';

export const ArticleItemStoreDispatchContext = createContext<
  Dispatch<ArticleItemStoreActionUnion> | null
>(null);

export function useArticleItemStoreDispatchContext () {
  return useContext(ArticleItemStoreDispatchContext)!;
}

export const ArticleItemStoreStateContext = createContext<
  Map<string, ArticleItemStoreState> | null
>(null);

export function useArticleItemStoreStateContext (
  sliceName: string
): ArticleItemStoreState {
  return useContext(ArticleItemStoreStateContext)!.get(sliceName)!;
}
