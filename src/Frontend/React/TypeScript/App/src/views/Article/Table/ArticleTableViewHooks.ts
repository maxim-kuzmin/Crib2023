import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreState,
} from '../../../app/Stores';

export interface ArticleTableViewHooks {
  readonly useClearActionOutput: (input: ArticleListStoreClearActionInput) => ArticleListStoreClearActionOutput;
  readonly useLoadActionOutput: (input: ArticleListStoreLoadActionInput) => ArticleListStoreLoadActionOutput;
  readonly useSetActionOutput: (input: ArticleListStoreSetActionInput) => ArticleListStoreSetActionOutput;
  readonly useStoreState: () => ArticleListStoreState;
}
