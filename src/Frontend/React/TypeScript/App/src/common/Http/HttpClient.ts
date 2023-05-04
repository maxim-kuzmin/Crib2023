import queryString from 'query-string';
import { type HttpRequestConfig, type HttpRequestResult } from './Request';

export interface HttpClient {
  readonly delete: (url: string, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly get: (url: string, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly post: (url: string, body: any, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly put: (url: string, body: any, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
}

function createRequestConfigValue (method: string, config?: HttpRequestConfig, body?: any) {
  const result: HttpRequestConfig = { ...config };

  result.init = { method, ...result.init };

  result.init.body = JSON.stringify(body);

  return result;
}

class HttpClientImpl implements HttpClient {
  async delete (url: string, config?: HttpRequestConfig) {
    return await this.request(url, createRequestConfigValue('DELETE', config));
  }

  async get (url: string, config?: HttpRequestConfig) {
    return await this.request(url, createRequestConfigValue('GET', config));
  }

  async post (url: string, body: any, config?: HttpRequestConfig) {
    return await this.request(url, createRequestConfigValue('POST', config, body));
  }

  async put (url: string, body: any, config?: HttpRequestConfig) {
    return await this.request(url, createRequestConfigValue('PUT', config, body));
  }

  private async request (url: string, config: HttpRequestConfig): Promise<HttpRequestResult> {
    const { init, query } = config;

    const input = query ? queryString.stringifyUrl({ url, query }) : url;

    const response = await fetch(input, init);

    const value = await response.json();

    const { ok, status, statusText } = response;

    return {
      ok,
      status,
      statusText,
      value
    }
  }
}

export function createHttpClient (): HttpClient {
  return new HttpClientImpl();
}
