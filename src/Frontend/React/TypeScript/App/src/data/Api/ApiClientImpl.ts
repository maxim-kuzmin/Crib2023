import { getModule } from '../../app';
import {
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult
} from '../../common';
import { type ApiClient } from './ApiClient';
import {
  type ApiOperationResponse,
  type ApiOperationResponseWithData
} from './Operation';
import {
  type ApiRequestOptionsWithBody,
  type ApiRequestOptions
} from './Request';
import {
  type ApiResponseResource,
  type ApiResponse,
  type ApiResponseDataWithDetails,
  type ApiResponseDataWithMessages,
  type ApiResponseError,
  type ApiResponseWithData
} from './Response';
import {
  type ApiResponseWithDetails,
  type ApiResponseWithMessages
} from './Responses';
import { type ApiSetupOptions } from './Setup';

interface Options {
  readonly apiSetupOptions: ApiSetupOptions;
  readonly httpClient: HttpClient;
}

interface RequestOptions {
  readonly getRequestResult: () => Promise<HttpRequestResult>;
  readonly operationName: string;
  readonly operationCode: string;
  readonly resourceOfApiResponse: ApiResponseResource;
}

interface RequestConfigOptions {
  readonly language: string;
  readonly operationCode: string;
  readonly query?: any;
  readonly apiSetupOptions: ApiSetupOptions;
}

function createRequestConfig ({
  language,
  operationCode,
  query,
  apiSetupOptions:
  {
    queryStringKeyForCulture,
    queryStringKeyForUICulture
  }
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

export class ApiClientImpl implements ApiClient {
  private readonly apiSetupOptions: ApiSetupOptions;
  private readonly httpClient: HttpClient;

  constructor (options: Options) {
    this.apiSetupOptions = options.apiSetupOptions;
    this.httpClient = options.httpClient;
  }

  async delete ({
    endpoint,
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptions): Promise<ApiOperationResponse> {
    const { language } = resourceOfApiResponse;

    return await this.request({
      getRequestResult: async () => await this.httpClient.delete(
        this.createUrl(endpoint),
        createRequestConfig({
          language,
          operationCode,
          query,
          apiSetupOptions: this.apiSetupOptions
        })
      ),
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async get<TData> ({
    endpoint,
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptions): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      getRequestResult: async () => await this.httpClient.get(
        this.createUrl(endpoint),
        createRequestConfig({
          language,
          operationCode,
          query,
          apiSetupOptions: this.apiSetupOptions
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
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptionsWithBody): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      getRequestResult: async () => await this.httpClient.post(
        this.createUrl(endpoint),
        body,
        createRequestConfig({
          language,
          operationCode,
          query,
          apiSetupOptions: this.apiSetupOptions
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
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptionsWithBody): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      getRequestResult: async () => await this.httpClient.put(
        this.createUrl(endpoint),
        body,
        createRequestConfig({
          language,
          operationCode,
          query,
          apiSetupOptions: this.apiSetupOptions
        })
      ),
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  private createUrl (endpoint: string) {
    return `${this.apiSetupOptions.url}/${endpoint}`;
  }

  private async request ({
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

      error = getModule().createApiResponseError({
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

      error = getModule().createApiResponseError({
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
