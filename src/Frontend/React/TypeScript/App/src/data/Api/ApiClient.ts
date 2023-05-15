import {
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult
} from '../../common';
import {
  type ApiOptions,
  type ApiOperationResponse,
  type ApiOperationResponseWithData,
  type ApiRequestOptionsWithBody,
  type ApiRequestOptions,
  type ApiResponse,
  type ApiResponseDataWithDetails,
  type ApiResponseDataWithMessages,
  type ApiResponseError,
  type ApiResponseFactory,
  type ApiResponseResource,
  type ApiResponseWithData,
  type ApiResponseWithDetails,
  type ApiResponseWithMessages
} from '.';

export interface ApiClient {
  readonly delete: (options: ApiRequestOptions) => Promise<ApiOperationResponse>;
  readonly get: <TData>(options: ApiRequestOptions) => Promise<ApiOperationResponseWithData<TData>>;
  readonly post: <TData>(options: ApiRequestOptionsWithBody) => Promise<ApiOperationResponseWithData<TData>>;
  readonly put: <TData>(options: ApiRequestOptionsWithBody) => Promise<ApiOperationResponseWithData<TData>>;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly optionsOfApi: ApiOptions;
}

interface RequestOptions {
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly getRequestResult: () => Promise<HttpRequestResult>;
  readonly operationName: string;
  readonly operationCode: string;
  readonly resourceOfApiResponse: ApiResponseResource;
}

interface RequestConfigOptions {
  readonly language: string;
  readonly operationCode: string;
  readonly optionsOfApi: ApiOptions;
  readonly query?: any;
}

function createRequestConfig ({
  language,
  operationCode,
  optionsOfApi:
  {
    queryStringKeyForCulture,
    queryStringKeyForUICulture
  },
  query,
}: RequestConfigOptions): HttpRequestConfig {
  return {
    query: {
      ...query,
      [queryStringKeyForCulture]: language,
      [queryStringKeyForUICulture]: language
    },
    init: {
      headers: {
        'Content-Type': 'application/json',
        OperationCode: operationCode
      }
    }
  }
};

class Implementation implements ApiClient {
  private readonly httpClient: HttpClient;
  private readonly optionsOfApi: ApiOptions;

  constructor ({
    httpClient,
    optionsOfApi,
  }: Options) {
    this.httpClient = httpClient;
    this.optionsOfApi = optionsOfApi;
  }

  async delete ({
    endpoint,
    factoryOfApiResponse,
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptions): Promise<ApiOperationResponse> {
    const { language } = resourceOfApiResponse;

    return await this.request({
      factoryOfApiResponse,
      getRequestResult: async () => await this.httpClient.delete(
        this.createUrl(endpoint),
        createRequestConfig({
          language,
          operationCode,
          optionsOfApi: this.optionsOfApi,
          query,
        })
      ),
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async get<TData> ({
    endpoint,
    factoryOfApiResponse,
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptions): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      factoryOfApiResponse,
      getRequestResult: async () => await this.httpClient.get(
        this.createUrl(endpoint),
        createRequestConfig({
          language,
          operationCode,
          optionsOfApi: this.optionsOfApi,
          query,
        })
      ),
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async post<TData> ({
    body,
    endpoint,
    factoryOfApiResponse,
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptionsWithBody): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      factoryOfApiResponse,
      getRequestResult: async () => await this.httpClient.post(
        this.createUrl(endpoint),
        body,
        createRequestConfig({
          language,
          operationCode,
          optionsOfApi: this.optionsOfApi,
          query,
        })
      ),
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async put<TData> ({
    body,
    endpoint,
    factoryOfApiResponse,
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptionsWithBody): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      factoryOfApiResponse,
      getRequestResult: async () => await this.httpClient.put(
        this.createUrl(endpoint),
        body,
        createRequestConfig({
          language,
          operationCode,
          optionsOfApi: this.optionsOfApi,
          query,
        })
      ),
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  private createUrl (endpoint: string) {
    return `${this.optionsOfApi.url}/${endpoint}`;
  }

  private async request ({
    factoryOfApiResponse,
    getRequestResult,
    operationName,
    operationCode,
    resourceOfApiResponse
  }: RequestOptions): Promise<ApiOperationResponse> {
    const { ok, value, status } = await getRequestResult();

    const response: ApiResponse = value;

    let responseWithDetails: ApiResponseWithDetails | null = null;
    let responseDataWithDetails: ApiResponseDataWithDetails | null = null;

    let responseWithMessages: ApiResponseWithMessages | null = null;
    let responseDataWithMessages: ApiResponseDataWithMessages | null = null;

    let error: ApiResponseError | null = null;

    if (!ok) {
      if (status === 400) {
          responseWithDetails = value;

          if (responseWithDetails) {
            responseDataWithDetails = responseWithDetails.data;
          }
      } else if (status === 500) {
          responseWithMessages = value;

          if (responseWithMessages) {
            responseDataWithMessages = responseWithMessages.data;
          }
      }

      error = factoryOfApiResponse.createError({
        resourceOfApiResponse,
        responseStatus: status,
        responseDataWithDetails,
        responseDataWithMessages
      });
    }

    return {
      error,
      operationCode: response.operationCode ?? operationCode,
      operationName
    };
  }

  private async requestWithData<TData> ({
    factoryOfApiResponse,
    getRequestResult,
    operationName,
    operationCode,
    resourceOfApiResponse
  }: RequestOptions): Promise<ApiOperationResponseWithData<TData>> {
    const { ok, value, status } = await getRequestResult();

    const response: ApiResponse = value;

    let responseWithData: ApiResponseWithData<TData> | null = null;
    let data: TData | null = null;

    let responseWithDetails: ApiResponseWithDetails | null = null;
    let responseDataWithDetails: ApiResponseDataWithDetails | null = null;

    let responseWithMessages: ApiResponseWithMessages | null = null;
    let responseDataWithMessages: ApiResponseDataWithMessages | null = null;

    let error: ApiResponseError | null = null;

    if (!ok) {
      if (status === 400) {
        responseWithDetails = value;

        if (responseWithDetails) {
          responseDataWithDetails = responseWithDetails.data;
        }
      } else if (status === 500) {
          responseWithMessages = value;

          if (responseWithMessages) {
            responseDataWithMessages = responseWithMessages.data;
          }
      }

      error = factoryOfApiResponse.createError({
        resourceOfApiResponse,
        responseStatus: status,
        responseDataWithDetails,
        responseDataWithMessages
      });
    } else {
      responseWithData = value;

      if (responseWithData) {
        data = responseWithData.data;
      }
    }

    return {
      data,
      error,
      operationCode: response.operationCode ?? operationCode,
      operationName
    };
  }
}

export function createApiClient (options: Options): ApiClient {
  return new Implementation(options);
}
