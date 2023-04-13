import { type TableControlService } from '../../../../../all';

interface Options {
  defaultPageSize: number;
}

export class TableControlServiceImpl implements TableControlService {
  public readonly defaultPageSize: number;

  constructor (options: Options) {
    this.defaultPageSize = options.defaultPageSize;
  }
}
