import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainListGetOperationInput } from './ArticleDomainListGetOperationInput';
import { type ArticleDomainListGetOperationOutput } from './ArticleDomainListGetOperationOutput';
import { type ArticleDomainListGetOperationRequest } from './ArticleDomainListGetOperationRequest';
import { type ArticleDomainListGetOperationRequestHandler } from './ArticleDomainListGetOperationRequestHandler';
import { type ArticleDomainListGetOperationResponse } from './ArticleDomainListGetOperationResponse';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

export class ArticleDomainListGetOperationRequestHandlerImpl implements ArticleDomainListGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ArticleDomainListGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
      ArticleDomainListGetOperationInput,
      ArticleDomainListGetOperationRequest,
      ArticleDomainListGetOperationOutput,
      ArticleDomainListGetOperationResponse
    >(
      request,
      async () => await this.repository.getList(request),
      shouldBeCanceled
    );
  }
}
