import { v4 as uuidv4 } from 'uuid';
import { type TestService } from '../../../common';
import {
  type ApiOperationResponse,
  type ApiResponseError,
  createApiResponseError
} from '../../../data';
import {
  type TopicDomainItemGetOperationRequest,
  type TopicDomainEntityForItem,
  type TopicDomainEntityForList,
  type TopicDomainEntityForTree,
  type TopicDomainRepository,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainItemGetOperationOutput,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainListGetOperationOutput,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse,
  type TopicDomainTreeGetOperationOutput,
  type TopicDomainItemSaveOperationRequest
} from '../../../domains';

let maxId = 0;

interface Options {
  readonly serviceOfTest: TestService;
}

class Implementation implements TopicDomainRepository {
  private entitiesForItem: TopicDomainEntityForItem[] = [];
  private readonly entitiesForList: TopicDomainEntityForList[] = [];
  private readonly entitiesForTree: TopicDomainEntityForTree[] = [];
  private readonly serviceOfTest: TestService;

  constructor ({
    serviceOfTest,
  }: Options) {
    this.serviceOfTest = serviceOfTest;

    for (let id = 1; id < 101; id++) {
      const entity: TopicDomainEntityForItem = {
        data: {
          id,
          name: `Name ${id}`,
          parentId: 0,
          rowGuid: uuidv4()
        },
        treeAncestors: [],
        treePath: `${id}`
      };

      this.entitiesForItem.push(entity);
    }

    for (let id = 1; id < 101; id++) {
      const entity: TopicDomainEntityForList = {
        data: {
          id,
          name: `Name ${id}`,
          parentId: 0,
          rowGuid: uuidv4()
        },
        treeAncestors: [],
        treeHasChildren: false,
        treeIsExpanded: false,
        treeLevel: 1,
        treePath: `${id}`
      };

      this.entitiesForList.push(entity);
    }

    for (let id = 1; id < 101; id++) {
      const entity: TopicDomainEntityForTree = {
        data: {
          id,
          name: `Name ${id}`,
          parentId: 0,
          rowGuid: uuidv4()
        },
        treeChildren: [],
        treeHasChildren: false,
        treeIsExpanded: false,
        treeLevel: 1,
        treePath: `${id}`
      };

      this.entitiesForTree.push(entity);
    }
  }

  async deleteItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<ApiOperationResponse> {
    const { operationCode, operationName, input } = request;

    this.entitiesForItem = this.entitiesForItem.filter(x => x.data.id === input.id);

    const result: ApiOperationResponse = {
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }

  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const item = this.entitiesForItem.find(x => x.data.id === input.id);

    const data: TopicDomainItemGetOperationOutput | null = item ? { item } : null;

    const status = data ? 200 : 404;

    let error: ApiResponseError | null = null;

    if (status === 404) {
      error = createApiResponseError({ responseStatus: status, resourceOfApiResponse });
    }

    const result: TopicDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }

  async getList (
    request: TopicDomainListGetOperationRequest
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName } = request;

    const data: TopicDomainListGetOperationOutput | null = {
      items: this.entitiesForList,
      totalCount: this.entitiesForList.length
    };

    const result: TopicDomainListGetOperationResponse = {
      data,
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }

  async getTree (
    request: TopicDomainTreeGetOperationRequest
  ): Promise<TopicDomainTreeGetOperationResponse> {
    const { operationCode, operationName } = request;

    const data: TopicDomainTreeGetOperationOutput | null = {
      nodes: this.entitiesForTree,
      totalCount: this.entitiesForList.length
    };

    const result: TopicDomainTreeGetOperationResponse = {
      data,
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }

  async saveItem (
    request: TopicDomainItemSaveOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    let item: TopicDomainEntityForItem | undefined;

    if (input.id > 0) {
      const item = this.entitiesForItem.find(x => x.data.id === input.id);

      if (item) {
        item.data = input;
      }
    } else {
      input.id = ++maxId;

      item = {
        data: input,
        treeAncestors: [],
        treePath: `${input.id}`
      }
    }

    const data: TopicDomainItemGetOperationOutput | null = item ? { item } : null;

    const status = data ? 200 : 404;

    let error: ApiResponseError | null = null;

    if (status === 404) {
      error = createApiResponseError({ responseStatus: status, resourceOfApiResponse });
    }

    const result: TopicDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      operationName
    };

    return await this.serviceOfTest.getDataAsync(() => result);
  }
}

export function createTopicDomainTestRepository (options: Options): TopicDomainRepository {
    return new Implementation(options);
}
