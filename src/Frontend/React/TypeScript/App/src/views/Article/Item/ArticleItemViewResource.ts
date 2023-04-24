export interface ArticleItemViewResource {
  readonly getArticle: () => string;
  readonly getBackToList: () => string;
  readonly getEdit: () => string;
  readonly getId: () => string;
}
