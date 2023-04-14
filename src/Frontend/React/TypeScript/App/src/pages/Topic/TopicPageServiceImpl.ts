import { type TableControlService } from '../../common';
import { type TopicPageService } from './TopicPageService';
import { type TopicPageUrlOptions, type TopicPageUrlSearch } from './Url';

const paramNameForPageNumber = 'pn';

const paramNameForPageSize = 'ps';

interface Options {
  tableControlService: TableControlService;
}

export class TopicPageServiceImpl implements TopicPageService {
  private readonly tableControlService: TableControlService;

  public lastUrl?: string;

  constructor (options: Options) {
    this.tableControlService = options.tableControlService;
  }

  createUrl (options?: TopicPageUrlOptions): string {
    let result = '/';

    let topicId = 0;

    let search: TopicPageUrlSearch = {
      pageNumber: 1,
      pageSize: this.tableControlService.defaultPageSize
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
    const { defaultPageSize } = this.tableControlService;

    return {
      pageNumber: Number(searchParams.get(paramNameForPageNumber) ?? 1),
      pageSize: Number(searchParams.get(paramNameForPageSize) ?? defaultPageSize)
    };
  }

  updateURLSearchParams (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) {
    const { pageNumber, pageSize } = urlSearch;

    const { defaultPageSize } = this.tableControlService;

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
