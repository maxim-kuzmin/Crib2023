import { type ArticleTypeEntity } from '../../../../../all';

export interface ArticleItemEditViewService {
  convertToFormValues: (entity?: ArticleTypeEntity) => any;
  readonly fieldNameForTitle: string;
  readonly fieldNameForBody: string;
  updateEntity: (entity: ArticleTypeEntity, formValues: any) => void;
}
