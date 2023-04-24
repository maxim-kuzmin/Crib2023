import {
  type ConfirmControlComponent,
  type NotificationControlHooks,
  type StoreService,
  type TableControlService
} from '../common';
import { type ConfirmControlHooks, type TableControlHooks } from '../controls';
import {
  type ApiResponseHooks,
  type ApiResponseError,
  type ApiResponseErrorOptions
} from '../data';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemSaveOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainRepository,
  type TopicDomainItemDeleteOperationRequestHandler,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainItemSaveOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainRepository,
  type TopicDomainTreeGetOperationRequestHandler,

} from '../domains';
import {
  type ArticlePageService,
  type TopicPageService
} from '../pages';
import {
  type TopicPathViewHooks,
  type AppNotificationViewHooks,
  type ArticleItemEditViewHooks,
  type ArticleItemEditViewService,
  type ArticleItemViewHooks,
  type ArticleTableViewHooks,
  type TopicItemViewHooks,
  type TopicTreeViewHooks
} from '../views';
import { type Hooks } from './Hooks';
import {
  type AppNotificationStoreHooks,
  type ArticleItemStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks
} from './Stores';
import { type TestService } from './Test';

export interface Module {
  readonly createApiResponseError: (options: ApiResponseErrorOptions) => ApiResponseError;
  readonly getApiResponseHooks: () => ApiResponseHooks;
  readonly getAppNotificationStoreHooks: () => AppNotificationStoreHooks;
  readonly getAppNotificationViewHooks: () => AppNotificationViewHooks;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticleItemStoreHooks: () => ArticleItemStoreHooks;
  readonly getArticleListStoreHooks: () => ArticleListStoreHooks;
  readonly getArticlePageService: () => ArticlePageService;
  readonly getArticleItemViewHooks: () => ArticleItemViewHooks;
  readonly getArticleItemEditViewHooks: () => ArticleItemEditViewHooks;
  readonly getArticleItemEditViewService: () => ArticleItemEditViewService;
  readonly getArticleTableViewHooks: () => ArticleTableViewHooks;
  readonly getConfirmControlComponent: () => ConfirmControlComponent;
  readonly getConfirmControlHooks: () => ConfirmControlHooks;
  readonly getHooks: () => Hooks;
  readonly getNotificationControlHooks: () => NotificationControlHooks;
  readonly getTableControlHooks: () => TableControlHooks;
  readonly getTableControlService: () => TableControlService;
  readonly getTestService: () => TestService;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
  readonly getTopicItemStoreHooks: () => TopicItemStoreHooks;
  readonly getTopicItemViewHooks: () => TopicItemViewHooks;
  readonly getTopicPathViewHooks: () => TopicPathViewHooks;
  readonly getTopicTreeStoreHooks: () => TopicTreeStoreHooks;
  readonly getTopicTreeViewHooks: () => TopicTreeViewHooks;
  readonly getTopicPageService: () => TopicPageService;
  readonly getStoreService: () => StoreService;
  readonly useArticleDomainItemDeleteOperationRequestHandler: () => ArticleDomainItemDeleteOperationRequestHandler;
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useArticleDomainItemSaveOperationRequestHandler: () => ArticleDomainItemSaveOperationRequestHandler;
  readonly useArticleDomainListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
  readonly useTopicDomainItemDeleteOperationRequestHandler: () => TopicDomainItemDeleteOperationRequestHandler;
  readonly useTopicDomainItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useTopicDomainItemSaveOperationRequestHandler: () => TopicDomainItemSaveOperationRequestHandler;
  readonly useTopicDomainListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTopicDomainTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
}
