import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationInput } from './ArticleDomainItemGetOperationInput';
import { type ArticleDomainItemGetOperationOutput } from './ArticleDomainItemGetOperationOutput';
import { type ArticleDomainItemGetOperationRequest } from './ArticleDomainItemGetOperationRequest';
import { type ArticleDomainItemGetOperationRequestHandler } from './ArticleDomainItemGetOperationRequestHandler';
import { type ArticleDomainItemGetOperationResponse } from './ArticleDomainItemGetOperationResponse';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

export class ArticleDomainItemGetOperationRequestHandlerImpl implements ArticleDomainItemGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ArticleDomainItemGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemGetOperationRequest,
      ArticleDomainItemGetOperationOutput,
      ArticleDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { id, title, topicId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (title && Number(topicId ?? 0) > 0);

        return isInputValid ? await this.repository.getItem(request) : null;
      },
      shouldBeCanceled
    );
  }
}
