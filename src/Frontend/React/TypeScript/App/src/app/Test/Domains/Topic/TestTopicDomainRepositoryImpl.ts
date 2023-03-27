import { v4 as uuidv4 } from 'uuid';
import {
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainRepository,
  type TopicDomainEntity,
  type TopicDomainItemGetOperationOutput,
  type TopicDomainListGetOperationOutput,
  type ApiResponseError,
  ApiResponseErrorImpl,
  getModule
} from '../../../../all';

export class TestTopicDomainRepositoryImpl implements TopicDomainRepository {
  private readonly items: TopicDomainEntity[] = [];

  constructor () {
    for (let id = 1; id < 101; id++) {
      const item: TopicDomainEntity = {
        data: {
          id,
          name: `Name ${id}`,
          parentId: 0,
          rowGuid: uuidv4()
        },
        treeHasChildren: false,
        treeLevel: 1,
        treePath: `${id}`
      };

      this.items.push(item);
    }
  }

  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    const item = this.items.find(x => x.data.id === input.id);

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
      items: this.items,
      totalCount: this.items.length
    };

    const result: TopicDomainListGetOperationResponse = {
      data,
      operationCode,
      operationName
    };

    return await getModule().getTestService().getDataAsync(() => result);
  }
}
