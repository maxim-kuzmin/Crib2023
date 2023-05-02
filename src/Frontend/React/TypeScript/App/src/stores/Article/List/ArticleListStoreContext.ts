import { type Dispatch, createContext } from 'react';
import { type ArticleListStoreState } from '../../../features';
import { type ArticleListStoreActionUnion } from './ArticleListStoreActionUnion';

export const ArticleListStoreDispatchContext = createContext<
  Dispatch<ArticleListStoreActionUnion> | null
>(null);

export const ArticleListStoreStateContext = createContext<
  Map<string, ArticleListStoreState> | null
>(null);
