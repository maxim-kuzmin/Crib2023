export interface HttpRequestResult {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly value: any;
}
