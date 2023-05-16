import queryString from 'query-string';
import { type HttpConfig, type HttpResponse } from '.';

export interface HttpClient {
  readonly delete: (url: string, config?: HttpConfig) => Promise<HttpResponse>;
  readonly get: (url: string, config?: HttpConfig) => Promise<HttpResponse>;
  readonly post: (url: string, body: any, config?: HttpConfig) => Promise<HttpResponse>;
  readonly put: (url: string, body: any, config?: HttpConfig) => Promise<HttpResponse>;
}

function createRequestConfigValue (method: string, config?: HttpConfig, body?: any) {
  const result: HttpConfig = { ...config };

  result.init = { method, ...result.init };

  result.init.body = JSON.stringify(body);

  return result;
}

class Implementation implements HttpClient {
  async delete (url: string, config?: HttpConfig) {
    return await this.request(url, createRequestConfigValue('DELETE', config));
  }

  async get (url: string, config?: HttpConfig) {
    return await this.request(url, createRequestConfigValue('GET', config));
  }

  async post (url: string, body: any, config?: HttpConfig) {
    return await this.request(url, createRequestConfigValue('POST', config, body));
  }

  async put (url: string, body: any, config?: HttpConfig) {
    return await this.request(url, createRequestConfigValue('PUT', config, body));
  }

  private async request (url: string, config: HttpConfig): Promise<HttpResponse> {
    const { init, query } = config;

    const input = query ? queryString.stringifyUrl({ url, query }) : url;

    const response = await fetch(input, init);

    const value = await response.json();

    const { headers, ok, status, statusText } = response;

    return {
      headers,
      ok,
      status,
      statusText,
      value,
      url: response.url,
    };
  }
}

export function createHttpClient (): HttpClient {
  return new Implementation();
}
