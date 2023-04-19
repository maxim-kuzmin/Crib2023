export interface ArticleItemStoreDeleteActionInput {
  readonly articleId: number;
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: () => void;
}
