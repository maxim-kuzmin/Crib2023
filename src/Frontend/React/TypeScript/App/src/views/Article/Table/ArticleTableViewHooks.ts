import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreState,
} from '../../../app/Stores';
import { type ArticleTableViewResource } from './ArticleTableViewResource';

export interface ArticleTableViewHooks {
  readonly useResource: () => ArticleTableViewResource;

  readonly useStoreClearActionOutput: (
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: () => ArticleListStoreState;
}
