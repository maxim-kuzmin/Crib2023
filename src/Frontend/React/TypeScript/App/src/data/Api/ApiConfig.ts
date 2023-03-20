export interface ApiConfig {
  readonly url: string;
}

export function createApiConfig (): ApiConfig {
  let url = process.env.REACT_APP_API_URL;

  if ((!url && url !== '') || url === '/') {
    url = '';
  }

  return {
    url
  };
}
