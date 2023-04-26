import { type ApiRequestHooks } from '../../data/Api/Request/ApiRequestHooks';
import { type ArticleDomainHooks } from './ArticleDomainHooks';
import { type ArticleDomainRepository } from './ArticleDomainRepository';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemSaveOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler
} from './Operations';
import {
  ArticleDomainItemDeleteOperationRequestHandlerImpl
} from './Operations/Item/Delete/ArticleDomainItemDeleteOperationRequestHandlerImpl';
import {
  ArticleDomainItemGetOperationRequestHandlerImpl
} from './Operations/Item/Get/ArticleDomainItemGetOperationRequestHandlerImpl';
import {
  ArticleDomainItemSaveOperationRequestHandlerImpl
} from './Operations/Item/Save/ArticleDomainItemSaveOperationRequestHandlerImpl';
import {
  ArticleDomainListGetOperationRequestHandlerImpl
} from './Operations/List/Get/ArticleDomainListGetOperationRequestHandlerImpl';

interface HooksOptions {
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly hooksOfApiRequest: ApiRequestHooks;
}

export function createArticleDomainHooks ({
  hooksOfApiRequest,
  getArticleDomainRepository
}: HooksOptions): ArticleDomainHooks {
  function useItemDeleteOperationRequestHandler (): ArticleDomainItemDeleteOperationRequestHandler {
    return new ArticleDomainItemDeleteOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: getArticleDomainRepository()
    });
  }

  function useItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return new ArticleDomainItemGetOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: getArticleDomainRepository()
    });
  }

  function useItemSaveOperationRequestHandler (): ArticleDomainItemSaveOperationRequestHandler {
    return new ArticleDomainItemSaveOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: getArticleDomainRepository()
    });
  }

  function useListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return new ArticleDomainListGetOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: getArticleDomainRepository()
    });
  }

  return {
    useItemDeleteOperationRequestHandler,
    useItemGetOperationRequestHandler,
    useItemSaveOperationRequestHandler,
    useListGetOperationRequestHandler
  };
}
