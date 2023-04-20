import { type ArticleTypeEntity } from '../../../../data';

export interface ArticleItemEditViewService {
  readonly convertToEntity: (formValues: any) => ArticleTypeEntity;
  readonly convertToFormValues: (entity?: ArticleTypeEntity) => any;
  readonly fieldNameForBody: string;
  readonly fieldNameForId: string;
  readonly fieldNameForTitle: string;
  readonly updateEntity: (entity: ArticleTypeEntity, formValues: any) => void;
}
