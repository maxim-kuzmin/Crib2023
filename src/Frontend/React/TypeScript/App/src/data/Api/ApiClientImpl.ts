import {
  type ApiClient,
  type ApiConfig,
  type ApiResponseWithData,
  type ApiResponseWithDetailsData,
  type ApiResponseWithErrorsData,
  type ApiResult,
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult
} from '../../all';

function createError (status: number, statusText: string): Error {
  let message = statusText ?? 'Unknown';

  switch (status) {
    case 400:
      message = '@@HttpError400';
      break;
    case 404:
      message = '@@HttpError404';
      break;
    case 500:
      message = '@@HttpError500';
      break;
  }

  return new Error(message);
}

function createRequestConfig (operaionCode: string, query?: any): HttpRequestConfig {
  return {
    query,
    init: {
      headers: {
        'Content-Type': 'application/json',
        OperationCode: operaionCode
      }
    }
  }
};

export class ApiClientImpl implements ApiClient {
  constructor (
    private readonly apiConfig: ApiConfig,
    private readonly httpClient: HttpClient
  ) {}

  async delete<TData> (
    endpoint: string,
    operationCode: string,
    query?: any
  ): Promise<ApiResult<TData>> {
    return await this.request(
      async () => await this.httpClient.delete(
        this.createUrl(endpoint),
        createRequestConfig(operationCode, query)),
      operationCode
    );
  }

  async get<TData> (
    endpoint: string,
    operationCode: string,
    query?: any
  ): Promise<ApiResult<TData>> {
    return await this.request(
      async () => await this.httpClient.get(
        this.createUrl(endpoint),
        createRequestConfig(operationCode, query)),
      operationCode
    );
  }

  async post<TData> (
    endpoint: string,
    operationCode: string,
    body: any,
    query?: any
  ): Promise<ApiResult<TData>> {
    return await this.request(
      async () => await this.httpClient.post(
        this.createUrl(endpoint),
        body,
        createRequestConfig(operationCode, query)),
      operationCode
    );
  }

  async put<TData> (
    endpoint: string,
    operationCode: string,
    body: any,
    query?: any
  ): Promise<ApiResult<TData>> {
    return await this.request(
      async () => await this.httpClient.put(
        this.createUrl(endpoint),
        body,
        createRequestConfig(operationCode, query)),
      operationCode
    );
  }

  private createUrl (endpoint: string) {
    return `${this.apiConfig.url}/${endpoint}`;
  }

  private async request<TData> (
    getRequestResult: () => Promise<HttpRequestResult>,
    operationCode: string
  ): Promise<ApiResult<TData>> {
    const { ok, value, status, statusText } = await getRequestResult();

    const responseWithData: ApiResponseWithData<TData> | null = value;
    const responseWithDetailsData: ApiResponseWithDetailsData | null = value;
    const responseWithErrorsData: ApiResponseWithErrorsData | null = value;
    const error: Error | null = ok ? null : createError(status, statusText);

    return {
      data: responseWithData?.data,
      error,
      operationCode,
      responseDetailsData: responseWithDetailsData?.data,
      responseErrorsData: responseWithErrorsData?.data,
      responseStatusCode: status
    };
  }
}
