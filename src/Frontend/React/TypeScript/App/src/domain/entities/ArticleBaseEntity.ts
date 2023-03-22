export interface ArticleBaseEntity<TData> {
  data: TData;
  topicPathItems: [{ id: number; name: string; }] | [];
}
