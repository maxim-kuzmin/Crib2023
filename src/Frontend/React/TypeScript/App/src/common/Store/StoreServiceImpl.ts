import { type StoreService } from '../../all';

export class StoreServiceImpl implements StoreService {
  createInitialState<TState>(sliceNames: string[], functionToCreateState: () => TState): Map<string, TState> {
    const result = new Map<string, TState>();

    sliceNames.forEach((sliceName) => {
      result.set(sliceName, functionToCreateState());
    });

    return result;
  }
}
