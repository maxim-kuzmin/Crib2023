import { v4 as uuidv4 } from 'uuid';
import { type TestService } from '../../../common';
import {
  type ApiOperationResponse,
  type ApiResponseError,
  createApiResponseError
} from '../../../data';
import {
  type ArticleDomainItemSaveOperationRequest,
  type ArticleDomainEntityForItem,
  type ArticleDomainItemGetOperationOutput,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainListGetOperationOutput,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainRepository
} from '../../../domains';

let maxId = 0;

interface Options {
  readonly serviceOfTest: TestService;
}

class Implementation implements ArticleDomainRepository {
  private items: ArticleDomainEntityForItem[] = [];
  private readonly serviceOfTest: TestService;

  constructor ({
    serviceOfTest,
  }: Options) {
    this.serviceOfTest = serviceOfTest;

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

      maxId = id;
    }
  }

  async deleteItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ApiOperationResponse> {
    const { operationCode, operationName, input } = request;

    this.items = this.items.filter(x => x.data.id === input.id);

    const result: ApiOperationResponse = {
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }

  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const item = this.items.find(x => x.data.id === input.id);

    const data: ArticleDomainItemGetOperationOutput | null = item ? { item } : null;

    const status = data ? 200 : 404;

    let error: ApiResponseError | null = null;

    if (status === 404) {
      error = createApiResponseError({ responseStatus: status, resourceOfApiResponse });
    }

    const result: ArticleDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
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

    return await this.serviceOfTest.getDataAsync(() => result);
  }

  async saveItem (
    request: ArticleDomainItemSaveOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    let item: ArticleDomainEntityForItem | undefined;

    if (input.id > 0) {
      const item = this.items.find(x => x.data.id === input.id);

      if (item) {
        item.data = input;
      }
    } else {
      input.id = ++maxId;

      item = {
        data: input,
        topicPathItems: []
      }
    }

    const data: ArticleDomainItemGetOperationOutput | null = item ? { item } : null;

    const status = data ? 200 : 404;

    let error: ApiResponseError | null = null;

    if (status === 404) {
      error = createApiResponseError({ responseStatus: status, resourceOfApiResponse });
    }

    const result: ArticleDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }
}

export function createArticleDomainTestRepository (options: Options): ArticleDomainRepository {
  return new Implementation(options);
}
