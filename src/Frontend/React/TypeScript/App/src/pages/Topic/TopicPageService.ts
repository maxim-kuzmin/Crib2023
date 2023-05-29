import { type TableControlSettings } from '../../common';
import { type TopicPageUrlOptions, type TopicPageUrlSearch } from './Url';

export interface TopicPageService {
  readonly createUrl: (options?: TopicPageUrlOptions) => string;
  readonly getUrlSearch: (searchParams: URLSearchParams) => TopicPageUrlSearch;
  lastUrl?: string;
  readonly updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) => void;
}

const paramNameForPageNumber = 'pn';

const paramNameForPageSize = 'ps';

interface Options {
  settingsOfTableControl: TableControlSettings;
}

class Implementation implements TopicPageService {
  private readonly settingsOfTableControl: TableControlSettings;

  public lastUrl?: string;

  constructor ({
    settingsOfTableControl
  }: Options) {
    this.settingsOfTableControl = settingsOfTableControl;
  }

  createUrl (options?: TopicPageUrlOptions): string {
    let result = '/';

    let topicId = 0;

    let search: TopicPageUrlSearch = {
      pageNumber: 1,
      pageSize: this.settingsOfTableControl.defaultPageSize
    };

    if (options) {
      if (options.topicId) {
        topicId = options.topicId;
      }

      if (options.search) {
        search = options.search;
      }
    }

    if (topicId > 0) {
      result += `topic/${topicId}`;
    }

    const searchParams = new URLSearchParams();

    this.updateURLSearchParams(searchParams, search);

    const searchParamsString = searchParams.toString();

    if (searchParamsString) {
      result += `?${searchParamsString}`;
    }

    return result;
  }

  getUrlSearch (searchParams: URLSearchParams): TopicPageUrlSearch {
    const { defaultPageSize } = this.settingsOfTableControl;

    return {
      pageNumber: Number(searchParams.get(paramNameForPageNumber) ?? 1),
      pageSize: Number(searchParams.get(paramNameForPageSize) ?? defaultPageSize)
    };
  }

  updateURLSearchParams (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) {
    const { pageNumber, pageSize } = urlSearch;

    const { defaultPageSize } = this.settingsOfTableControl;

    if (pageNumber > 1) {
      searchParams.set(paramNameForPageNumber, pageNumber.toString());
    } else {
      searchParams.delete(paramNameForPageNumber);
    }

    if (pageSize !== defaultPageSize) {
      searchParams.set(paramNameForPageSize, pageSize.toString());
    } else {
      searchParams.delete(paramNameForPageSize);
    }
  }
}

export function createTopicPageService (options: Options): TopicPageService {
  return new Implementation(options);
}
