export interface ApiSetupOptions {
  readonly url: string;
}

export function createApiSetupOptions (): ApiSetupOptions {
  let url = process.env.REACT_APP_API_URL;

  if ((!url && url !== '') || url === '/') {
    url = '';
  }

  return {
    url
  };
}
