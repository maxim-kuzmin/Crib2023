import {
  type HttpClient,
  type HttpConfig,
  type HttpResponse
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
  type ApiResponseResource,
  type ApiResponseWithData,
  type ApiResponseWithDetails,
  type ApiResponseWithMessages,
  createApiResponseError,
  createApiOperationResponse,
  createApiOperationResponseWithData,
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
  readonly getResponse: () => Promise<HttpResponse>;
  readonly operationName: string;
  readonly operationCode: string;
  readonly resourceOfApiResponse: ApiResponseResource;
}

interface HttpConfigOptions {
  readonly language: string;
  readonly operationCode: string;
  readonly optionsOfApi: ApiOptions;
  readonly query?: any;
}

function createHttpConfig ({
  language,
  operationCode,
  optionsOfApi:
  {
    queryStringKeyForCulture,
    queryStringKeyForUICulture
  },
  query,
}: HttpConfigOptions): HttpConfig {
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
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptions): Promise<ApiOperationResponse> {
    const { language } = resourceOfApiResponse;

    return await this.request({
      getResponse: async () => await this.httpClient.delete(
        this.createUrl(endpoint),
        createHttpConfig({
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
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptions): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      getResponse: async () => await this.httpClient.get(
        this.createUrl(endpoint),
        createHttpConfig({
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
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptionsWithBody): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      getResponse: async () => await this.httpClient.post(
        this.createUrl(endpoint),
        body,
        createHttpConfig({
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
    operationName,
    operationCode,
    query,
    resourceOfApiResponse
  }: ApiRequestOptionsWithBody): Promise<ApiOperationResponseWithData<TData>> {
    const { language } = resourceOfApiResponse;

    return await this.requestWithData({
      getResponse: async () => await this.httpClient.put(
        this.createUrl(endpoint),
        body,
        createHttpConfig({
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
    getResponse,
    operationName,
    operationCode,
    resourceOfApiResponse
  }: RequestOptions): Promise<ApiOperationResponse> {
    let responseWithDetails: ApiResponseWithDetails | null = null;
    let responseDataWithDetails: ApiResponseDataWithDetails | null = null;

    let responseWithMessages: ApiResponseWithMessages | null = null;
    let responseDataWithMessages: ApiResponseDataWithMessages | null = null;

    let errorOfApiResponse: ApiResponseError | null = null;

    try {
      const { ok, value, status } = await getResponse();

      const response: ApiResponse = value;

      if (ok) {
        return createApiOperationResponse({
          operationCode: response.operationCode ?? operationCode,
          operationName
        });
      }

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

      errorOfApiResponse = createApiResponseError({
        resourceOfApiResponse,
        responseStatus: status,
        responseDataWithDetails,
        responseDataWithMessages
      });
    } catch (error: unknown) {
      errorOfApiResponse = createApiResponseError({
        message: (error instanceof Error) ? error.message : '',
        resourceOfApiResponse
      });
    }

    return await Promise.reject(
      createApiOperationResponse({
        error: errorOfApiResponse,
        operationCode,
        operationName,
      })
    );
  }

  private async requestWithData<TData> ({
    getResponse,
    operationName,
    operationCode,
    resourceOfApiResponse
  }: RequestOptions): Promise<ApiOperationResponseWithData<TData>> {
    let responseWithData: ApiResponseWithData<TData> | null = null;
    let data: TData | null = null;

    let responseWithDetails: ApiResponseWithDetails | null = null;
    let responseDataWithDetails: ApiResponseDataWithDetails | null = null;

    let responseWithMessages: ApiResponseWithMessages | null = null;
    let responseDataWithMessages: ApiResponseDataWithMessages | null = null;

    let errorOfApiResponse: ApiResponseError | null = null;

    try {
      const { ok, value, status } = await getResponse();

      const response: ApiResponse = value;

      if (ok) {
        responseWithData = value;

        if (responseWithData) {
          data = responseWithData.data;
        }

        return createApiOperationResponseWithData({
          data,
          error: errorOfApiResponse,
          operationCode: response.operationCode ?? operationCode,
          operationName
        });
      }

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

      errorOfApiResponse = createApiResponseError({
        resourceOfApiResponse,
        responseStatus: status,
        responseDataWithDetails,
        responseDataWithMessages
      });
    } catch (error: unknown) {
      errorOfApiResponse = createApiResponseError({
        message: (error instanceof Error) ? error.message : '',
        resourceOfApiResponse
      });
    }

    return await Promise.reject(
      createApiOperationResponse({
        error: errorOfApiResponse,
        operationCode,
        operationName,
      })
    );
  }
}

export function createApiClient (options: Options): ApiClient {
  return new Implementation(options);
}
