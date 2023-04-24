export interface TableControlResource {
  readonly getFrom: () => string;
  readonly getJumpTo: () => string;
  readonly getNext3Pages: () => string;
  readonly getNext5Pages: () => string;
  readonly getNextPage: () => string;
  readonly getPageTo: () => string;
  readonly getPerPage: () => string;
  readonly getPrev3Pages: () => string;
  readonly getPrev5Pages: () => string;
  readonly getPrevPage: () => string;
}
