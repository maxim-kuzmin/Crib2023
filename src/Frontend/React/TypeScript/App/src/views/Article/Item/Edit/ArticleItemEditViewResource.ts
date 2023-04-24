export interface ArticleItemEditViewResource {
  readonly getArticleEdit: () => string;
  readonly getArticleNew: () => string;
  readonly getBackToList: () => string;
  readonly getBody: () => string;
  readonly getDisplay: () => string;
  readonly getId: () => string;
  readonly getReset: () => string;
  readonly getSave: () => string;
  readonly getTitle: () => string;
  readonly getTopic: () => string;
}
