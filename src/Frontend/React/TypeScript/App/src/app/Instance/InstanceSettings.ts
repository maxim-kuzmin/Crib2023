import { type CommonSettings } from '../../common';
import { type DataSettings } from '../../data';
import { type FeaturesSettings } from '../../features';

export interface InstanceSettings {
  readonly Common: CommonSettings;
  readonly Data: DataSettings;
  readonly Features: FeaturesSettings;
}

export function createInstanceSettings (): InstanceSettings {
  return {
    Common: {
      Controls: {
        Table: {
          defaultPageSize: Number(process.env.REACT_APP_TABLE_CONTROL_DEFAULT_PAGE_SIZE ?? 10),
        }
      },
      isTestModeEnabled: process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true',
    },
    Data: {
      Api: {
        queryStringKeyForCulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_CULTURE ?? 'lng',
        queryStringKeyForUICulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_UI_CULTURE ?? 'ui-lng',
        url: process.env.REACT_APP_API_URL ?? '',
      }
    },
    Features: {
      App: {
        Localization: {
          pathOfApiResponseResource: 'data/Api/Response/ApiResponse',
          pathOfArticleItemStoreResource: 'stores/Article/Item/ArticleItemStore',
          pathOfArticleListStoreResource: 'stores/Article/List/ArticleListStore',
          pathOfArticleItemViewResource: 'views/Article/Item/ArticleItemView',
          pathOfArticleItemEditViewResource: 'views/Article/Item/Edit/ArticleItemEditView',
          pathOfArticleTableViewResource: 'views/Article/Table/ArticleTableView',
          pathOfConfirmControlResource: 'controls/Confirm/ConfirmControl',
          pathOfOperationHandlerResource: 'common/Operation/Handler/OperationHandler',
          pathOfTableControlResource: 'controls/Table/TableControl',
          pathOfTopicItemStoreResource: 'stores/Topic/Item/TopicItemStore',
          pathOfTopicPathViewResource: 'views/Topic/Path/TopicPathView',
          pathOfTopicTreeStoreResource: 'stores/Topic/Tree/TopicTreeStore',
        }
      }
    },
  };
};
