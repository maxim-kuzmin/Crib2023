import { type LocalizationResource } from '../..';

export interface TableControlResource extends LocalizationResource {
  readonly getPaginationPartForFrom: () => string;
  readonly getPaginationPartForJumpTo: () => string;
  readonly getPaginationPartForNext3Pages: () => string;
  readonly getPaginationPartForNext5Pages: () => string;
  readonly getPaginationPartForNextPage: () => string;
  readonly getPaginationPartForPageTo: () => string;
  readonly getPaginationPartForPerPage: () => string;
  readonly getPaginationPartForPrev3Pages: () => string;
  readonly getPaginationPartForPrev5Pages: () => string;
  readonly getPaginationPartForPrevPage: () => string;
}
