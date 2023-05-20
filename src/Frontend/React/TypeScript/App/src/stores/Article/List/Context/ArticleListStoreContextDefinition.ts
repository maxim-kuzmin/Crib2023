import { type Dispatch, createContext } from 'react';
import { type ArticleListStoreStateMap } from '../../../../features';
import { type ArticleListStoreActionUnion } from '../ArticleListStoreActionUnion';

export const ArticleListStoreDispatchContext = createContext<
  Dispatch<ArticleListStoreActionUnion> | null
>(null);

export const ArticleListStoreStateContext = createContext<
ArticleListStoreStateMap | null
>(null);
