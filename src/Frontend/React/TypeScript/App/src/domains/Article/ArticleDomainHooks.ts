import { type ApiRequestHooks } from '../../data/Api/Request/ApiRequestHooks';
import { type ArticleDomainModule } from './ArticleDomainModule';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemSaveOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
} from './Operations';
import {
  ArticleDomainItemDeleteOperationRequestHandlerImpl
} from './Operations/Item/Delete/ArticleDomainItemDeleteOperationRequestHandlerImpl';
import {
  createArticleDomainItemGetOperationRequestHandler
} from './Operations/Item/Get/ArticleDomainItemGetOperationRequestHandler';
import {
  createArticleDomainItemSaveOperationRequestHandler
} from './Operations/Item/Save/ArticleDomainItemSaveOperationRequestHandler';
import {
  createArticleDomainListGetOperationRequestHandler
} from './Operations/List/Get/ArticleDomainListGetOperationRequestHandler';

export interface ArticleDomainHooks {
  readonly useItemDeleteOperationRequestHandler: () => ArticleDomainItemDeleteOperationRequestHandler;
  readonly useItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useItemSaveOperationRequestHandler: () => ArticleDomainItemSaveOperationRequestHandler;
  readonly useListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
}

interface HooksOptions {
  readonly hooksOfApiRequest: ApiRequestHooks;
  readonly moduleOfArticleDomain: ArticleDomainModule;
}

export function createArticleDomainHooks ({
  hooksOfApiRequest,
  moduleOfArticleDomain
}: HooksOptions): ArticleDomainHooks {
  function useItemDeleteOperationRequestHandler (): ArticleDomainItemDeleteOperationRequestHandler {
    return new ArticleDomainItemDeleteOperationRequestHandlerImpl({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: moduleOfArticleDomain.getRepository()
    });
  }

  function useItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return createArticleDomainItemGetOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfArticleDomain.getRepository()
    });
  }

  function useItemSaveOperationRequestHandler (): ArticleDomainItemSaveOperationRequestHandler {
    return createArticleDomainItemSaveOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: moduleOfArticleDomain.getRepository()
    });
  }

  function useListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return createArticleDomainListGetOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfArticleDomain.getRepository()
    });
  }

  return {
    useItemDeleteOperationRequestHandler,
    useItemGetOperationRequestHandler,
    useItemSaveOperationRequestHandler,
    useListGetOperationRequestHandler
  };
}
