import { type ArticleItemStoreContentForResponse } from '../../../../all';

export type ArticleItemStoreCallbackToClear = () => void;
export type ArticleItemStoreCallbackToSet = (response: ArticleItemStoreContentForResponse) => void;
