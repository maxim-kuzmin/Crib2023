import {
  type TopicPageUrlOptions,
  type TableControlService,
  type TopicPageService,
  type TopicPageUrlSearch
} from '../../../all';

const pageNumberParamName = 'pn';

const pageSizeParamName = 'ps';

export class TopicPageServiceImpl implements TopicPageService {
  constructor (private readonly tableControlService: TableControlService) {}

  createUrl (options?: TopicPageUrlOptions): string {
    let result = '/topic';

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
      result += `/${topicId}`;
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
      pageNumber: Number(searchParams.get(pageNumberParamName) ?? 1),
      pageSize: Number(searchParams.get(pageSizeParamName) ?? defaultPageSize)
    };
  }

  updateURLSearchParams (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) {
    const { pageNumber, pageSize } = urlSearch;

    const { defaultPageSize } = this.tableControlService;

    if (pageNumber > 1) {
      searchParams.set(pageNumberParamName, pageNumber.toString());
    } else {
      searchParams.delete(pageNumberParamName);
    }

    if (pageSize !== defaultPageSize) {
      searchParams.set(pageSizeParamName, pageSize.toString());
    } else {
      searchParams.delete(pageSizeParamName);
    }
  }
}
