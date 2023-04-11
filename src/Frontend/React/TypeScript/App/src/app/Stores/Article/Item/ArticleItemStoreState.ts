import {
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationResponse,
  type OperationState
} from '../../../../all';

export type ArticleItemStoreStateInput = ArticleDomainItemGetOperationInput | null;

export type ArticleItemStoreStateResponse = ArticleDomainItemGetOperationResponse | null;

export interface ArticleItemStoreState extends OperationState {
  input: ArticleItemStoreStateInput;
  response: ArticleItemStoreStateResponse;
}
