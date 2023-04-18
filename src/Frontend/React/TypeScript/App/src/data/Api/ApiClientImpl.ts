import { getModule } from '../../app/ModuleImpl';
import { type HttpClient, type HttpRequestConfig, type HttpRequestResult } from '../../common';
import { type ApiClient } from './ApiClient';
import { type ApiOperationResponse, type ApiOperationResponseWithData } from './Operation';
import {
  type ApiResponse,
  type ApiResponseDataWithDetails,
  type ApiResponseDataWithMessages,
  type ApiResponseError,
  type ApiResponseWithData
} from './Response';
import { type ApiResponseWithDetails, type ApiResponseWithMessages } from './Responses';
import { type ApiSetupOptions } from './Setup';

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

interface Options {
  apiSetupOptions: ApiSetupOptions;
  httpClient: HttpClient;
}

export class ApiClientImpl implements ApiClient {
  private readonly apiSetupOptions: ApiSetupOptions;
  private readonly httpClient: HttpClient;

  constructor (options: Options) {
    this.apiSetupOptions = options.apiSetupOptions;
    this.httpClient = options.httpClient;
  }

  async delete (
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ): Promise<ApiOperationResponse> {
    return await this.request(
      async () => await this.httpClient.delete(
        this.createUrl(endpoint),
        createRequestConfig(operationCode, query)
      ),
      operationName,
      operationCode
    );
  }

  async get<TData> (
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ): Promise<ApiOperationResponseWithData<TData>> {
    return await this.requestWithData(
      async () => await this.httpClient.get(
        this.createUrl(endpoint),
        createRequestConfig(operationCode, query)
      ),
      operationName,
      operationCode
    );
  }

  async post<TData> (
    endpoint: string,
    operationName: string,
    operationCode: string,
    body: any,
    query?: any
  ): Promise<ApiOperationResponseWithData<TData>> {
    return await this.requestWithData(
      async () => await this.httpClient.post(
        this.createUrl(endpoint),
        body,
        createRequestConfig(operationCode, query)
      ),
      operationName,
      operationCode
    );
  }

  async put<TData> (
    endpoint: string,
    operationName: string,
    operationCode: string,
    body: any,
    query?: any
  ): Promise<ApiOperationResponseWithData<TData>> {
    return await this.requestWithData(
      async () => await this.httpClient.put(
        this.createUrl(endpoint),
        body,
        createRequestConfig(operationCode, query)
      ),
      operationName,
      operationCode
    );
  }

  private createUrl (endpoint: string) {
    return `${this.apiSetupOptions.url}/${endpoint}`;
  }

  private async request (
    getRequestResult: () => Promise<HttpRequestResult>,
    requestOperationName: string,
    requestOperationCode: string
  ): Promise<ApiOperationResponse> {
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

      error = getModule().createApiResponseError(status, { responseDataWithDetails, responseDataWithMessages });
    }

    return {
      error,
      operationCode: response.operationCode ?? requestOperationCode,
      operationName: requestOperationName
    };
  }

  private async requestWithData<TData> (
    getRequestResult: () => Promise<HttpRequestResult>,
    requestOperationName: string,
    requestOperationCode: string
  ): Promise<ApiOperationResponseWithData<TData>> {
    const { ok, value, status } = await getRequestResult();

    const response: ApiResponse = value;

    let responseWithData: ApiResponseWithData<TData> | null = null;
    let data: TData | null = null;

    let responseWithDetails: ApiResponseWithDetails | null = null;
    let responseDataWithDetails: ApiResponseDataWithDetails | null = null;

    let responseWithMessages: ApiResponseWithMessages | null = null;
    let responseDataWithMessages: ApiResponseDataWithMessages | null = null;

    let error: ApiResponseError | null = null;

    if (ok) {
      responseWithData = value;

      if (responseWithData) {
        data = responseWithData.data;
      }
    } else {
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

      error = getModule().createApiResponseError(status, { responseDataWithDetails, responseDataWithMessages });
    }

    return {
      data,
      error,
      operationCode: response.operationCode ?? requestOperationCode,
      operationName: requestOperationName
    };
  }
}
