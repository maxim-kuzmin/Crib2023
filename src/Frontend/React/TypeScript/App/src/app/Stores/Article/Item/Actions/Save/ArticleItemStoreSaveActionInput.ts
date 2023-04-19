import { type ArticleTypeEntity } from '../../../../../../data';
import { type ArticleItemStoreSetActionPayload } from '../Set';

export interface ArticleItemStoreSaveActionInput {
  readonly entity: ArticleTypeEntity;
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: (payload: ArticleItemStoreSetActionPayload) => void;
}
