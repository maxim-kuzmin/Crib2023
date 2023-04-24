export interface ArticleTableViewResource {
  readonly getArticles: () => string;
  readonly getActions: () => string;
  readonly getDelete: () => string;
  readonly getDisplay: () => string;
  readonly getEdit: () => string;
  readonly getId: () => string;
  readonly getNew: () => string;
  readonly getPath: () => string;
  readonly getTitle: () => string;
}
