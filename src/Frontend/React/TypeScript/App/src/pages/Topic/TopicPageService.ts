import { type TableControlOptions } from '../../common';
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
  optionsOfTableControl: TableControlOptions;
}

class Implementation implements TopicPageService {
  private readonly optionsOfTableControl: TableControlOptions;

  public lastUrl?: string;

  constructor ({
    optionsOfTableControl
  }: Options) {
    this.optionsOfTableControl = optionsOfTableControl;
  }

  createUrl (options?: TopicPageUrlOptions): string {
    let result = '/';

    let topicId = 0;

    let search: TopicPageUrlSearch = {
      pageNumber: 1,
      pageSize: this.optionsOfTableControl.defaultPageSize
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
    const { defaultPageSize } = this.optionsOfTableControl;

    return {
      pageNumber: Number(searchParams.get(paramNameForPageNumber) ?? 1),
      pageSize: Number(searchParams.get(paramNameForPageSize) ?? defaultPageSize)
    };
  }

  updateURLSearchParams (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) {
    const { pageNumber, pageSize } = urlSearch;

    const { defaultPageSize } = this.optionsOfTableControl;

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
