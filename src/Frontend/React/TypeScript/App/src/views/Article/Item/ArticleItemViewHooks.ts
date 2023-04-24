import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreState,
} from '../../../app/Stores';
import { type ArticleItemViewResource } from './ArticleItemViewResource';

export interface ArticleItemViewHooks {
  readonly useResource: () => ArticleItemViewResource;

  readonly useStoreClearActionOutput: (
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: (
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: () => ArticleItemStoreState;
}
