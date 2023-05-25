import { type Dispatch, createContext } from 'react';
import { type ArticleItemStoreStateMap } from '../../../../features';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';

export const ArticleItemStoreDispatchContext = createContext<
  Dispatch<ArticleItemStoreActionUnion> | null
>(null);

export const ArticleItemStoreStateContext = createContext<
  ArticleItemStoreStateMap | null
>(null);
