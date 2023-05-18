import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationInput } from './ArticleDomainItemGetOperationInput';
import { type ArticleDomainItemGetOperationOutput } from './ArticleDomainItemGetOperationOutput';
import { type ArticleDomainItemGetOperationRequest } from './ArticleDomainItemGetOperationRequest';
import { type ArticleDomainItemGetOperationResponse } from './ArticleDomainItemGetOperationResponse';

export interface ArticleDomainItemGetOperationRequestHandler {
  handle: (
    request: ArticleDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

class Implementation implements ArticleDomainItemGetOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ArticleDomainItemGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemGetOperationRequest,
      ArticleDomainItemGetOperationOutput,
      ArticleDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { id, title, topicId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (title && Number(topicId ?? 0) > 0);

        if (isInputValid) {
          return await this.repository.getItem(request);
        }

        return null;
      },
      shouldBeCanceled
    );
  }
}

export function createArticleDomainItemGetOperationRequestHandler (
  options: Options
): ArticleDomainItemGetOperationRequestHandler {
  return new Implementation(options);
}
