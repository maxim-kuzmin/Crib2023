import { v4 as uuidv4 } from 'uuid';
import {
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainRepository,
  getTestDataAsync,
  type ArticleEntity,
  type ArticleDomainItemGetOperationOutput,
  type ArticleDomainListGetOperationOutput
} from '../../../../all';

export class TestArticleDomainRepositoryImpl implements ArticleDomainRepository {
  private readonly items: ArticleEntity[] = [];

  constructor () {
    for (let id = 1; id < 101; id++) {
      const item: ArticleEntity = {
        data: {
          id,
          body: `Body ${id}`,
          title: `Title ${id}`,
          topicId: 0,
          rowGuid: uuidv4()
        },
        topicPathItems: []
      };

      this.items.push(item);
    }
  }

  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, input } = request;

    const item = this.items.find(x => x.data.id === input.id);

    const data: ArticleDomainItemGetOperationOutput | null = item ? { item } : null;

    const responseStatusCode = data ? 200 : 404;

    let error: Error | null = null;

    if (responseStatusCode === 404) {
      error = new Error('@@HttpError404');
    }

    const result: ArticleDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      responseStatusCode
    };

    return await getTestDataAsync(() => result);
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { operationCode } = request;

    const data: ArticleDomainListGetOperationOutput | null = {
      items: this.items,
      totalCount: this.items.length
    };

    const result: ArticleDomainListGetOperationResponse = {
      data,
      operationCode,
      responseStatusCode: 200
    };

    return await getTestDataAsync(() => result);
  }
}
