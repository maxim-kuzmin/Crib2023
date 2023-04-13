import { v4 as uuidv4 } from 'uuid';
import {
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainRepository,
  type TopicDomainItemGetOperationOutput,
  type TopicDomainListGetOperationOutput,
  type ApiResponseError,
  type TopicDomainEntityForList,
  type TopicDomainEntityForItem,
  type TopicDomainEntityForTree,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse,
  type TopicDomainTreeGetOperationOutput
} from '../../../../all';
import { getModule } from '../../../Module/Impls';
import { ApiResponseErrorImpl } from '../../../Module/Impls/Data/Api/Response/ApiResponseErrorImpl';

export class TestTopicDomainRepositoryImpl implements TopicDomainRepository {
  private readonly entitiesForItem: TopicDomainEntityForItem[] = [];
  private readonly entitiesForList: TopicDomainEntityForList[] = [];
  private readonly entitiesForTree: TopicDomainEntityForTree[] = [];

  constructor () {
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

  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    const item = this.entitiesForItem.find(x => x.data.id === input.id);

    const data: TopicDomainItemGetOperationOutput | null = item ? { item } : null;

    const status = data ? 200 : 404;

    let error: ApiResponseError | null = null;

    if (status === 404) {
      error = new ApiResponseErrorImpl(status);
    }

    const result: TopicDomainItemGetOperationResponse = {
      data,
      error,
      operationCode,
      operationName
    };

    return await getModule().getTestService().getDataAsync(() => result);
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

    return await getModule().getTestService().getDataAsync(() => result);
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

    return await getModule().getTestService().getDataAsync(() => result);
  }
}
