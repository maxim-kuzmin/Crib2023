import { type ArticleTypeEntity } from '../../../../../all';

export interface ArticleItemEditViewService {
  convertToFormValues: (entity: ArticleTypeEntity) => any;
  readonly fieldNameTitle: string;
  readonly fieldNameForBody: string;
  updateEntity: (entity: ArticleTypeEntity, formValues: any) => void;
}
