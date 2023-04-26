import { type ApiRequestHooks } from '../../data/Api/ApiRequestHooks';
import { type TopicDomainHooks } from './TopicDomainHooks';
import { type TopicDomainRepository } from './TopicDomainRepository';
import {
  type TopicDomainTreeGetOperationRequestHandler,
  type TopicDomainItemDeleteOperationRequestHandler,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainItemSaveOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler
} from './Operations';
import {
  TopicDomainItemDeleteOperationRequestHandlerImpl
} from './Operations/Item/Delete/TopicDomainItemDeleteOperationRequestHandlerImpl';
import {
  TopicDomainItemGetOperationRequestHandlerImpl
} from './Operations/Item/Get/TopicDomainItemGetOperationRequestHandlerImpl';
import {
  TopicDomainItemSaveOperationRequestHandlerImpl
} from './Operations/Item/Save/TopicDomainItemSaveOperationRequestHandlerImpl';
import {
  TopicDomainListGetOperationRequestHandlerImpl
} from './Operations/List/Get/TopicDomainListGetOperationRequestHandlerImpl';
import {
  TopicDomainTreeGetOperationRequestHandlerImpl
} from './Operations/Tree/Get/TopicDomainTreeGetOperationRequestHandlerImpl';

interface HooksOptions {
  readonly getTopicDomainRepository: () => TopicDomainRepository;
  readonly hooksOfApiRequest: ApiRequestHooks;
}

export function createTopicDomainHooks ({
  hooksOfApiRequest,
  getTopicDomainRepository
}: HooksOptions): TopicDomainHooks {
  function useItemDeleteOperationRequestHandler (): TopicDomainItemDeleteOperationRequestHandler {
    return new TopicDomainItemDeleteOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: getTopicDomainRepository()
    });
  }

  function useItemGetOperationRequestHandler (): TopicDomainItemGetOperationRequestHandler {
    return new TopicDomainItemGetOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: getTopicDomainRepository()
    });
  }

  function useItemSaveOperationRequestHandler (): TopicDomainItemSaveOperationRequestHandler {
    return new TopicDomainItemSaveOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: getTopicDomainRepository()
    });
  }

  function useListGetOperationRequestHandler (): TopicDomainListGetOperationRequestHandler {
    return new TopicDomainListGetOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: getTopicDomainRepository()
    });
  }

  function useTreeGetOperationRequestHandler (): TopicDomainTreeGetOperationRequestHandler {
    return new TopicDomainTreeGetOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: getTopicDomainRepository()
    });
  }

  return {
    useItemDeleteOperationRequestHandler,
    useItemGetOperationRequestHandler,
    useItemSaveOperationRequestHandler,
    useListGetOperationRequestHandler,
    useTreeGetOperationRequestHandler
  };
}
