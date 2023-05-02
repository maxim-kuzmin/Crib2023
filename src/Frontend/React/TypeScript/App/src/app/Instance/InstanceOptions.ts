import { type CommonOptions } from '../../common';
import { type DataOptions } from '../../data';

export interface InstanceOptions {
  readonly Common: CommonOptions;
  readonly Data: DataOptions;
}

export function createInstanceOptions (): InstanceOptions {
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
    }
  };
};
