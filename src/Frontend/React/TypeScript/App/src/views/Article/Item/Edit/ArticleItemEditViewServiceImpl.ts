import { type ArticleTypeEntity } from '../../../../data';
import { type ArticleItemEditViewService } from './ArticleItemEditViewService';

export class ArticleItemEditViewServiceImpl implements ArticleItemEditViewService {
  public readonly fieldNameForBody = 'body';
  public readonly fieldNameForId = 'id';
  public readonly fieldNameForTitle = 'title';

  convertToFormValues (entity?: ArticleTypeEntity): any {
    if (entity) {
      const { body, id, title } = entity;

      return {
        [this.fieldNameForBody]: body,
        [this.fieldNameForId]: id,
        [this.fieldNameForTitle]: title
      };
    } else {
      return {};
    }
  }

  updateEntity (entity: ArticleTypeEntity, formValues: any): void {
    entity.body = formValues[this.fieldNameForBody];
    entity.id = formValues[this.fieldNameForId];
    entity.title = formValues[this.fieldNameForTitle];
  }
}
