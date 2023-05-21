import { type ApiRequestHooks } from '../../data';
import {
  type TopicDomainTreeGetOperationRequestHandler,
  type TopicDomainItemDeleteOperationRequestHandler,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainItemSaveOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler
} from './Operations';
import {
  createTopicDomainItemDeleteOperationRequestHandler
} from './Operations/Item/Delete/TopicDomainItemDeleteOperationRequestHandler';
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
    return createTopicDomainItemDeleteOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useItemGetOperationRequestHandler (): TopicDomainItemGetOperationRequestHandler {
    return createTopicDomainItemGetOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useItemSaveOperationRequestHandler (): TopicDomainItemSaveOperationRequestHandler {
    return createTopicDomainItemSaveOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useListGetOperationRequestHandler (): TopicDomainListGetOperationRequestHandler {
    return createTopicDomainListGetOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: moduleOfTopicDomain.getRepository()
    });
  }

  function useTreeGetOperationRequestHandler (): TopicDomainTreeGetOperationRequestHandler {
    return createTopicDomainTreeGetOperationRequestHandler({
      handlerOfApiRequest: hooksOfApiRequest.useHandler({
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
