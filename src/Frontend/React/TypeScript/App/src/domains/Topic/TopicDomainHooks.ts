import { type ApiRequestHooks } from '../../data';
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
  createTopicDomainItemGetOperationRequestHandler
} from './Operations/Item/Get/TopicDomainItemGetOperationRequestHandler';
import {
  createTopicDomainItemSaveOperationRequestHandler
} from './Operations/Item/Save/TopicDomainItemSaveOperationRequestHandler';
import {
  createTopicDomainListGetOperationRequestHandler
} from './Operations/List/Get/TopicDomainListGetOperationRequestHandler';
import {
  createTopicDomainTreeGetOperationRequestHandler
} from './Operations/Tree/Get/TopicDomainTreeGetOperationRequestHandler';
import { type TopicDomainModule } from './TopicDomainModule';

export interface TopicDomainHooks {
  readonly useItemDeleteOperationRequestHandler: () => TopicDomainItemDeleteOperationRequestHandler;
  readonly useItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useItemSaveOperationRequestHandler: () => TopicDomainItemSaveOperationRequestHandler;
  readonly useListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
}

interface Options {
  readonly hooksOfApiRequest: ApiRequestHooks;
  readonly moduleOfTopicDomain: TopicDomainModule;
}

export function createTopicDomainHooks ({
  hooksOfApiRequest,
  moduleOfTopicDomain,
}: Options): TopicDomainHooks {
  function useItemDeleteOperationRequestHandler (): TopicDomainItemDeleteOperationRequestHandler {
    return new TopicDomainItemDeleteOperationRequestHandlerImpl({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useItemGetOperationRequestHandler (): TopicDomainItemGetOperationRequestHandler {
    return createTopicDomainItemGetOperationRequestHandler({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useItemSaveOperationRequestHandler (): TopicDomainItemSaveOperationRequestHandler {
    return createTopicDomainItemSaveOperationRequestHandler({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useListGetOperationRequestHandler (): TopicDomainListGetOperationRequestHandler {
    return createTopicDomainListGetOperationRequestHandler({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useTreeGetOperationRequestHandler (): TopicDomainTreeGetOperationRequestHandler {
    return createTopicDomainTreeGetOperationRequestHandler({
      apiRequestHandler: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfTopicDomain.getRepository()
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
