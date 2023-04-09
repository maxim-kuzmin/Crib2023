import {
  type TopicDomainItemGetOperationOutput,
  type ApiRequestHandler,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainRepository,
  type ShouldBeCanceled
} from '../../../../../../../all';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

export class TopicDomainItemGetOperationRequestHandlerImpl implements TopicDomainItemGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainItemGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      TopicDomainItemGetOperationInput,
      TopicDomainItemGetOperationRequest,
      TopicDomainItemGetOperationOutput,
      TopicDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { id, name, parentId } = request.input;

        const isInputValid = (id ?? 0) > 0 || (name && (parentId ?? 0) > 0);

        return isInputValid ? await this.repository.getItem(request) : null;
      },
      shouldBeCanceled
    );
  }
}
