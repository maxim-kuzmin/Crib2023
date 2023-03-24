import {
  type ApiClient,
  type ApiSetupOptions,
  type ApiResponseWithData,
  type ApiResponseWithDetails,
  type ApiResponseWithMessages,
  type ApiOperationResponse,
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult,
  type ApiResponse,
  type ApiResponseDataWithDetails,
  type ApiResponseDataWithMessages,
  ApiResponseErrorImpl,
  type ApiResponseError
} from '../../../all';

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
    private readonly apiSetupOptions: ApiSetupOptions,
    private readonly httpClient: HttpClient
  ) {}

  async delete<TData> (
    endpoint: string,
    operationName: string,
    operationCode: string,
    query?: any
  ): Promise<ApiOperationResponse<TData>> {
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
  ): Promise<ApiOperationResponse<TData>> {
    return await this.request(
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
  ): Promise<ApiOperationResponse<TData>> {
    return await this.request(
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
  ): Promise<ApiOperationResponse<TData>> {
    return await this.request(
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

  private async request<TData> (
    getRequestResult: () => Promise<HttpRequestResult>,
    requestOperationName: string,
    requestOperationCode: string
  ): Promise<ApiOperationResponse<TData>> {
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

      error = new ApiResponseErrorImpl(status, { responseDataWithDetails, responseDataWithMessages });
    }

    return {
      data,
      error,
      operationCode: response.operationCode ?? requestOperationCode,
      operationName: requestOperationName
    };
  }
}
