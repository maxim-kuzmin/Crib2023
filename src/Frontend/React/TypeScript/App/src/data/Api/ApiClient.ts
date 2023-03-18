import { v4 as uuidv4 } from 'uuid';

import {
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult,
  type NotificationData,
  NotificationType,
  type ApiRequestConfig,
  type ApiRequestResult,
  type ApiRequest,
  type ApiResponseWithData,
  type ApiResponseWithDetailsData,
  type ApiResponseWithErrorsData
} from '../../all';

const httpRequestConfig: HttpRequestConfig = {
  headers: { 'Content-Type': 'application/json' }
};

export interface ApiClient<TData extends null> {
  readonly delete: (url: string, config?: ApiRequestConfig) => Promise<ApiRequestResult<TData>>;
  readonly get: (url: string, config?: ApiRequestConfig) => Promise<ApiRequestResult<TData>>;
  readonly post: (url: string, config?: ApiRequestConfig) => Promise<ApiRequestResult<TData>>;
  readonly put: (url: string, config?: ApiRequestConfig) => Promise<ApiRequestResult<TData>>;
}

export class ApiClientImpl<TData extends null> implements ApiClient<TData> {
  constructor (
    private readonly operationName: string,
    private readonly httpClient: HttpClient,
    private readonly functionToSetNotification: (data: NotificationData) => void
  ) {}

  async delete (url: string, config?: ApiRequestConfig): Promise<ApiRequestResult<TData>> {
    return await this.request(
      { url },
      async () => await this.httpClient.delete(url, httpRequestConfig),
      config?.operationCode
    );
  }

  async get (url: string, config?: ApiRequestConfig): Promise<ApiRequestResult<TData>> {
    return await this.request(
      { url },
      async () => await this.httpClient.get(url, httpRequestConfig),
      config?.operationCode
    );
  }

  async post (url: string, body: any, config?: ApiRequestConfig): Promise<ApiRequestResult<TData>> {
    return await this.request(
      { url, body },
      async () => await this.httpClient.post(url, body, httpRequestConfig),
      config?.operationCode
    );
  }

  async put (url: string, body: any, config?: ApiRequestConfig): Promise<ApiRequestResult<TData>> {
    return await this.request(
      { url, body },
      async () => await this.httpClient.put(url, body, httpRequestConfig),
      config?.operationCode
    );
  }

  private async request (
    request: ApiRequest,
    getRequestResult: () => Promise<HttpRequestResult>,
    operationCode?: string
  ): Promise<ApiRequestResult<TData>> {
    let result: ApiRequestResult<TData>;

    const title = `${this.operationName}: ${operationCode ?? uuidv4()}`;

    try {
      console.log(title, request);

      const requestResult = await getRequestResult();

      const responseWithData: ApiResponseWithData<TData> | null = requestResult.value;
      const responseWithDetailsData: ApiResponseWithDetailsData | null = requestResult.value;
      const responseWithErrorsData: ApiResponseWithErrorsData | null = requestResult.value;

      result = {
        data: responseWithData?.data,
        operationCode,
        responseDetailsData: responseWithDetailsData?.data,
        responseErrorsData: responseWithErrorsData?.data,
        responseStatusCode: requestResult.status
      };

      this.onSuccess(title, result, requestResult.ok, requestResult.statusText);
    } catch (error) {
      this.onError(title, error);

      result = {
        data: null,
        operationCode,
        responseDetailsData: null,
        responseErrorsData: null,
        responseStatusCode: 0
      };
    }

    return result;
  }

  private onSuccess<TData> (title: string, result: ApiRequestResult<TData>, ok: boolean, statusText: string) {
    console.log(title, result);

    if (ok) {
      this.functionToSetNotification({
        type: NotificationType.Success,
        message: title,
      });
    } else {
      let message = statusText ?? 'Unknown';

      switch (result.responseStatusCode) {
        case 400:
          message = '@@status-text-400';
          break;
        case 404:
          message = '@@status-text-404';
          break;
        case 500:
          message = '@@status-text-500';
          break;
      }

      throw new Error(message);
    }
  }

  private onError (title: string, error: any) {
    console.error(title, error);

    this.functionToSetNotification({
      type: NotificationType.Error,
      message: title,
      description: error.message
    });
  }
}
