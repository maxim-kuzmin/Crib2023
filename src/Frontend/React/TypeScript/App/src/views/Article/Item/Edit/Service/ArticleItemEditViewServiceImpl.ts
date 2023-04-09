import { type ArticleItemEditViewService, type ArticleTypeEntity } from '../../../../../all';

export class ArticleItemEditViewServiceImpl implements ArticleItemEditViewService {
  public readonly fieldNameForBody = 'body';

  public readonly fieldNameTitle = 'title';

  convertToFormValues (entity: ArticleTypeEntity): any {
    const { body, title } = entity;

    return {
      [this.fieldNameForBody]: body,
      [this.fieldNameTitle]: title
    };
  }

  updateEntity (entity: ArticleTypeEntity, formValues: any): void {
    entity.body = formValues[this.fieldNameForBody];
    entity.title = formValues[this.fieldNameTitle];
  }
}
