import queryString from 'query-string';
import {
  type HttpClient,
  type HttpRequestConfig,
  type HttpRequestResult
} from '../../all';

function createRequestConfigValue (method: string, config?: HttpRequestConfig, body?: any) {
  const result: HttpRequestConfig = { ...config };

  result.init = { method, ...result.init };

  result.init.body = JSON.stringify(body);

  return result;
}

export class HttpClientImpl implements HttpClient {
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
