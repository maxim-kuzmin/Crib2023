import { type Module } from '../../../all';
import { ModuleImpl } from './ModuleImpl';

const module = new ModuleImpl();

export function getModule (): Module {
  return module;
}

export { HttpClientImpl } from './Http/HttpClientImpl';
export { TableControlServiceImpl } from './Controls/Table/TableControlServiceImpl';
export { OperationHandlerImpl } from './Operation/OperationHandlerImpl';
export { SetupOptionsImpl } from './Setup/SetupOptionsImpl';
export { StoreServiceImpl } from './Store/StoreServiceImpl';
export { ApiClientImpl } from './Data/Api/ApiClientImpl';
export { ApiRequestHandlerImpl } from './Data/Api/Request/ApiRequestHandlerImpl';
export { ApiResponseErrorImpl } from './Data/Api/Response/ApiResponseErrorImpl';
export { ApiSetupOptionsImpl } from './Data/Api/Setup/ApiSetupOptionsImpl';
export {
  ArticleDomainItemGetOperationRequestHandlerImpl
} from './Domains/Article/Operations/Item/Get/ArticleDomainItemGetOperationRequestHandlerImpl';
export {
  ArticleDomainListGetOperationRequestHandlerImpl
} from './Domains/Article/Operations/List/Get/ArticleDomainListGetOperationRequestHandlerImpl';
export { ArticleDomainRepositoryImpl } from './Domains/Article/ArticleDomainRepositoryImpl';
export {
  TopicDomainItemGetOperationRequestHandlerImpl
} from './Domains/Topic/Operations/Item/Get/TopicDomainItemGetOperationRequestHandlerImpl';
export {
  TopicDomainListGetOperationRequestHandlerImpl
} from './Domains/Topic/Operations/List/Get/TopicDomainListGetOperationRequestHandlerImpl';
export {
  TopicDomainTreeGetOperationRequestHandlerImpl
} from './Domains/Topic/Operations/Tree/Get/TopicDomainTreeGetOperationRequestHandlerImpl';
export { TopicDomainRepositoryImpl } from './Domains/Topic/TopicDomainRepositoryImpl';
export { ArticlePageServiceImpl } from './Pages/Article/ArticlePageServiceImpl';
export { TopicPageServiceImpl } from './Pages/Topic/TopicPageServiceImpl';
export { ArticleItemEditViewServiceImpl } from './Views/Article/Item/Edit/ArticleItemEditViewServiceImpl';
export { ModuleImpl } from './ModuleImpl';
