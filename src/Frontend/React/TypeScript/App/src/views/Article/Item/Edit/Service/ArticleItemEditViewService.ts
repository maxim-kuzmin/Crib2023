import { type ArticleTypeEntity } from '../../../../../all';

export interface ArticleItemEditViewService {
  convertToFormValues: (entity?: ArticleTypeEntity) => any;
  readonly fieldNameForBody: string;
  readonly fieldNameForId: string;
  readonly fieldNameForTitle: string;
  updateEntity: (entity: ArticleTypeEntity, formValues: any) => void;
}
