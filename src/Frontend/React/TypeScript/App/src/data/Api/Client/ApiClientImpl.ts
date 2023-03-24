import {
  type ApiClient,
  type ApiSetupOptions,
  type ApiResponseWithData,
  type ApiResponseWithDetailsData,
  type ApiResponseWithErrorsData,
  type ApiOperationResponse,
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult,
  type ApiResponse,
  type ApiResponseDetailsData,
  type ApiResponseErrorsData,
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
    operationCode: string,
    query?: any
  ): Promise<ApiOperationResponse<TData>> {
    return await this.request(
      async () => await this.httpClient.delete(
        this.createUrl(endpoint),
        createRequestConfig(operationCode, query)
      ),
      operationCode
    );
  }

  async get<TData> (
    endpoint: string,
    operationCode: string,
    query?: any
  ): Promise<ApiOperationResponse<TData>> {
    return await this.request(
      async () => await this.httpClient.get(
        this.createUrl(endpoint),
        createRequestConfig(operationCode, query)
      ),
      operationCode
    );
  }

  async post<TData> (
    endpoint: string,
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
      operationCode
    );
  }

  async put<TData> (
    endpoint: string,
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
      operationCode
    );
  }

  private createUrl (endpoint: string) {
    return `${this.apiSetupOptions.url}/${endpoint}`;
  }

  private async request<TData> (
    getRequestResult: () => Promise<HttpRequestResult>,
    requestOperationCode: string
  ): Promise<ApiOperationResponse<TData>> {
    const { ok, value, status } = await getRequestResult();

    const response: ApiResponse = value;

    let error: ApiResponseError | null = null;
    let responseWithData: ApiResponseWithData<TData> | null = null;
    let responseWithDetailsData: ApiResponseWithDetailsData | null = null;
    let responseWithErrorsData: ApiResponseWithErrorsData | null = null;

    let responseDetailsData: ApiResponseDetailsData | null = null;
    let responseErrorsData: ApiResponseErrorsData | null = null;

    if (ok) {
      responseWithData = value;
    } else {
      if (status === 400) {
          responseWithDetailsData = value;

          if (responseWithDetailsData) {
            responseDetailsData = responseWithDetailsData.data;
          }
      } else if (status === 500) {
          responseWithErrorsData = value;

          if (responseWithErrorsData) {
            responseErrorsData = responseWithErrorsData.data;
          }
      }

      error = new ApiResponseErrorImpl({ responseDetailsData, responseErrorsData });
    }

    return {
      data: responseWithData?.data,
      error,
      operationCode: response.operationCode ?? requestOperationCode
    };
  }
}
