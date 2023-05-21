import { type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainListGetOperationInput } from './ArticleDomainListGetOperationInput';
import { type ArticleDomainListGetOperationOutput } from './ArticleDomainListGetOperationOutput';
import { type ArticleDomainListGetOperationRequest } from './ArticleDomainListGetOperationRequest';
import { type ArticleDomainListGetOperationResponse } from './ArticleDomainListGetOperationResponse';

export interface ArticleDomainListGetOperationRequestHandler {
  handle: (
    request: ArticleDomainListGetOperationRequest,
    abortController: AbortController
  ) => Promise<ArticleDomainListGetOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

class Implementation implements ArticleDomainListGetOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainListGetOperationRequest,
    abortController: AbortController
  ): Promise<ArticleDomainListGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
      ArticleDomainListGetOperationInput,
      ArticleDomainListGetOperationRequest,
      ArticleDomainListGetOperationOutput,
      ArticleDomainListGetOperationResponse
    >(
      request,
      async () => await this.repository.getList(request),
      abortController
    );
  }
}

export function createArticleDomainListGetOperationRequestHandler (
  options: Options
): ArticleDomainListGetOperationRequestHandler {
  return new Implementation(options);
}
