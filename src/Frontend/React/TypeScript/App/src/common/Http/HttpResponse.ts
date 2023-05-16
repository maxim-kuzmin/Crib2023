export interface HttpResponse {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly value: any;
  readonly url: string;
}
