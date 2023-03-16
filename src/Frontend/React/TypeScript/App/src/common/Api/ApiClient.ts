
export interface ApiClient {
  readonly delete: <TResponse>(endpoint: string, config?: RequestInit) => Promise<TResponse>;
  readonly get: <TResponse>(endpoint: string, config?: RequestInit) => Promise<TResponse>;
  readonly post: <TResponse>(endpoint: string, body: any, config?: RequestInit) => Promise<TResponse>;
  readonly put: <TResponse>(endpoint: string, body: any, config?: RequestInit) => Promise<TResponse>;
}

class ApiClientImpl implements ApiClient {
  constructor (private readonly url: string) {}

  private async request<TResponse> (
    endpoint: string,
    config: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(`${this.url}/${endpoint}`, config);
    return await response.json();
  }

  async delete<TResponse>(endpoint: string, config?: RequestInit) {
    return await this.requestWithoutBody<TResponse>('DELETE', endpoint, config);
  }

  async get<TResponse>(endpoint: string, config?: RequestInit) {
    return await this.requestWithoutBody<TResponse>('GET', endpoint, config);
  }

  async post<TResponse> (endpoint: string, body: any, config: RequestInit = {}) {
    return await this.requestWithBody<TResponse>('POST', endpoint, body, config);
  }

  async put<TResponse> (endpoint: string, body: any, config: RequestInit = {}) {
    return await this.requestWithBody<TResponse>('PUT', endpoint, body, config);
  }

  private async requestWithoutBody<TResponse> (method: string, endpoint: string, config: RequestInit = {}) {
    return await this.request<TResponse>(endpoint, { method, ...config });
  }

  private async requestWithBody<TResponse> (method: string, endpoint: string, body: any, config: RequestInit = {}) {
    return await this.request<TResponse>(endpoint, { method, ...config, body: JSON.stringify(body) });
  }
}

export function createApiClient (url?: string): ApiClient {
  if ((!url && url !== '') || url === '/') {
    url = '';
  }

  return new ApiClientImpl(url);
}
