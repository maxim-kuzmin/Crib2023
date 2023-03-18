export interface ApiResponseDetailsData {
  readonly details: [{ name: string; values: string[]; }];
  readonly summary: string;
}
