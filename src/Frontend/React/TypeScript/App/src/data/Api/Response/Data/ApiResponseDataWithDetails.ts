export interface ApiResponseDataWithDetails {
  readonly details: [{ name: string; values: string[]; }];
  readonly summary: string;
}
