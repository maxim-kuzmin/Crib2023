import { type ArticleTypeEntity } from '../../../../data';

export interface ArticleItemEditViewService {
  readonly convertToFormValues: (entity?: ArticleTypeEntity) => any;
  readonly fieldNameForBody: string;
  readonly fieldNameForId: string;
  readonly fieldNameForTitle: string;
  readonly updateEntity: (entity: ArticleTypeEntity, formValues: any) => void;
}