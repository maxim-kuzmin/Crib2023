import queryString from 'query-string';
import {
  type HttpRequestConfig,
  type HttpRequestResult
} from '../../all';

export interface HttpClient {
  readonly delete: (endpoint: string, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly get: (endpoint: string, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly post: (endpoint: string, body: any, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
  readonly put: (endpoint: string, body: any, config?: HttpRequestConfig) => Promise<HttpRequestResult>;
}

export class HttpClientImpl implements HttpClient {
  private readonly baseUrl: string;

  constructor (baseUrl: string) {
    if ((!baseUrl && baseUrl !== '') || baseUrl === '/') {
      baseUrl = '';
    }

    this.baseUrl = baseUrl;
  }

  async delete (endpoint: string, config?: HttpRequestConfig) {
    return await this.requestWithoutBody('DELETE', endpoint, config);
  }

  async get (endpoint: string, config?: HttpRequestConfig) {
    return await this.requestWithoutBody('GET', endpoint, config);
  }

  async post (endpoint: string, body: any, config?: HttpRequestConfig) {
    return await this.requestWithBody('POST', endpoint, body, config);
  }

  async put (endpoint: string, body: any, config?: HttpRequestConfig) {
    return await this.requestWithBody('PUT', endpoint, body, config);
  }

  private async request (
    url: string,
    config: HttpRequestConfig
  ): Promise<HttpRequestResult> {
    let endpoint = url;

    if (config) {
      const { query } = config;

      if (query) {
        endpoint = queryString.stringifyUrl({ url, query });
      }
    }

    const response = await fetch(`${this.baseUrl}/${endpoint}`, config);

    const value = await response.json();

    const { ok, status, statusText } = response;

    return {
      ok,
      status,
      statusText,
      value
    }
  }

  private async requestWithoutBody (
    method: string,
    endpoint: string,
    config?: HttpRequestConfig
  ) {
    return await this.request(endpoint, { method, ...config });
  }

  private async requestWithBody (
    method: string,
    endpoint: string,
    body: any,
    config?: HttpRequestConfig
  ) {
    return await this.request(endpoint, { method, ...config, body: JSON.stringify(body) });
  }
}
