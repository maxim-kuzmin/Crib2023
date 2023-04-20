export interface TopicTypeEntity {
  id: number;
  name: string;
  parentId: number;
  rowGuid?: string;
}

export function createTopicTypeEntity (options?: Partial<TopicTypeEntity>): TopicTypeEntity {
  return {
    id: options?.id ?? 0,
    name: options?.name ?? '',
    parentId: options?.parentId ?? 0,
    rowGuid: options?.rowGuid ?? ''
  };
}
