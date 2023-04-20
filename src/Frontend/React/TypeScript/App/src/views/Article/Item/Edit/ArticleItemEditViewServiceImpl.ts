import { type ArticleTypeEntity } from '../../../../data';
import { type ArticleItemEditViewService } from './ArticleItemEditViewService';

export class ArticleItemEditViewServiceImpl implements ArticleItemEditViewService {
  public readonly fieldNameForBody = 'body';
  public readonly fieldNameForId = 'id';
  public readonly fieldNameForTitle = 'title';
  public readonly fieldNameForTopicId = 'topicId';

  convertToEntity (formValues: any): ArticleTypeEntity {
    return {
      body: formValues[this.fieldNameForBody],
      id: formValues[this.fieldNameForId],
      title: formValues[this.fieldNameForTitle],
      topicId: formValues[this.fieldNameForTopicId]
    };
  }

  convertToFormValues (entity: ArticleTypeEntity): any {
    const { body, id, title, topicId } = entity;

    return {
      [this.fieldNameForBody]: body,
      [this.fieldNameForId]: id,
      [this.fieldNameForTitle]: title,
      [this.fieldNameForTopicId]: topicId
    };
  }

  updateEntity (entity: ArticleTypeEntity, formValues: any): void {
    entity.body = formValues[this.fieldNameForBody];
    entity.id = formValues[this.fieldNameForId];
    entity.title = formValues[this.fieldNameForTitle];
    entity.topicId = formValues[this.fieldNameForTopicId];
  }
}
