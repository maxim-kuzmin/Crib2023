import { type ArticleItemEditViewService, type ArticleTypeEntity } from '../../../../../all';

export class ArticleItemEditViewServiceImpl implements ArticleItemEditViewService {
  public readonly fieldNameForBody = 'body';

  public readonly fieldNameForTitle = 'title';

  convertToFormValues (entity?: ArticleTypeEntity): any {
    if (entity) {
      const { body, title } = entity;

      return {
        [this.fieldNameForBody]: body,
        [this.fieldNameForTitle]: title
      };
    } else {
      return {};
    }
  }

  updateEntity (entity: ArticleTypeEntity, formValues: any): void {
    entity.body = formValues[this.fieldNameForBody];
    entity.title = formValues[this.fieldNameForTitle];
  }
}
