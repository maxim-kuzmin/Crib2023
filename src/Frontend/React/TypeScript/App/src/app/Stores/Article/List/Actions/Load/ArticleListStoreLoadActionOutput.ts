import { type ArticleListStoreSetActionPayload } from '../Set';
import { type ArticleListStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatch';

export interface ArticleListStoreLoadActionOutput {
  readonly dispatchOfLoadAction: ArticleListStoreLoadActionDispatch;
  readonly loading: boolean;
  readonly payload: ArticleListStoreSetActionPayload;
}
