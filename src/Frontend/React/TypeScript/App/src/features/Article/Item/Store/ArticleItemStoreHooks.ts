import {
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionOutput
} from './Actions';
import { type ArticleItemStoreSliceName } from './Slice';
import { type ArticleItemStoreResource } from './ArticleItemStoreResource';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

export interface ArticleItemStoreHooks {
  readonly useResource: () => ArticleItemStoreResource;

  readonly useStoreClearActionOutput: (
    sliceName: ArticleItemStoreSliceName
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: (
    sliceName: ArticleItemStoreSliceName
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: ArticleItemStoreSliceName) => ArticleItemStoreState;
}
