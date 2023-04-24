import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type ArticleListStoreState } from '../../../app';
import { type ArticleListStoreActionUnion } from './ArticleListStoreActionUnion';

export const ArticleListStoreDispatchContext = createContext<Dispatch<ArticleListStoreActionUnion> | null>(null);
export const ArticleListStoreStateContext = createContext<Map<string, ArticleListStoreState> | null>(null);

export function useArticleListStoreDispatchContext () {
  return useContext(ArticleListStoreDispatchContext)!;
}
export function useArticleListStoreStateContext (sliceName: string): ArticleListStoreState {
  return useContext(ArticleListStoreStateContext)!.get(sliceName)!;
}
