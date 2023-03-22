import {
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainRepository,
  getTestDataAsync
} from '../../../../all';

export class TestArticleDomainRepositoryImpl implements ArticleDomainRepository {
  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, input } = request;

    const result: ArticleDomainItemGetOperationResponse = {
      operationCode,
      data: {
        item: {
          data: {
            id: input.id,
            title: `Title ${input.id}`,
            body: `Body ${input.id}`,
            topicId: 0,
            rowGuid: ''
          },
          topicPathItems: []
        },
      }
    };

    return await getTestDataAsync(() => result);
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { operationCode } = request;

    const result: ArticleDomainListGetOperationResponse = {
      operationCode,
      data: {
        items: [],
        totalCount: 0
      }
    };

    return await getTestDataAsync(() => result);
  }
}
