import { v4 as uuidv4 } from 'uuid';
import {
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainRepository,
  type ArticleDomainEntityForItem,
  type ArticleDomainItemGetOperationOutput,
  type ArticleDomainListGetOperationOutput,
  type ApiResponseError,
} from '../../../../all';
import { getModule } from '../../../ModuleImpl';

export class TestArticleDomainRepositoryImpl implements ArticleDomainRepository {
  private readonly items: ArticleDomainEntityForItem[] = [];

  constructor () {
    for (let id = 1; id < 101; id++) {
      const item: ArticleDomainEntityForItem = {
        data: {
          body: `Body ${id}`,
          id,
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
    const { operationCode, operationName, input } = request;

    const item = this.items.find(x => x.data.id === input.id);

    const data: ArticleDomainItemGetOperationOutput | null = item ? { item } : null;

    const status = data ? 200 : 404;

    let error: ApiResponseError | null = null;

    if (status === 404) {
      error = getModule().createApiResponseError(status);
    }

    const result: ArticleDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      operationName
    };

    return await getModule().getTestService().getDataAsync(() => result);
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { operationCode, operationName } = request;

    const data: ArticleDomainListGetOperationOutput | null = {
      items: this.items,
      totalCount: this.items.length
    };

    const result: ArticleDomainListGetOperationResponse = {
      data,
      operationCode,
      operationName
    };

    return await getModule().getTestService().getDataAsync(() => result);
  }
}
