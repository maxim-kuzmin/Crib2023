import { type Dispatch, createContext } from 'react';
import { type ArticleItemStoreState } from '../../../../features';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';

export const ArticleItemStoreDispatchContext = createContext<
  Dispatch<ArticleItemStoreActionUnion> | null
>(null);

export const ArticleItemStoreStateContext = createContext<
  Map<string, ArticleItemStoreState> | null
>(null);
