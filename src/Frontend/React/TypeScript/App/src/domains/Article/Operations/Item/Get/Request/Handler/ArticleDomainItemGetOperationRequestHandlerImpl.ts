import {
  type ArticleDomainItemGetOperationOutput,
  type ApiRequestHandler,
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainRepository,
  type ShouldBeCanceled
} from '../../../../../../../all';

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
    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemGetOperationRequest,
      ArticleDomainItemGetOperationOutput,
      ArticleDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { id, title, topicId } = request.input;

        const isInputValid = (id ?? 0) > 0 || (title && (topicId ?? 0) > 0);

        return isInputValid ? await this.repository.getItem(request) : null;
      },
      shouldBeCanceled
    );
  }
}
