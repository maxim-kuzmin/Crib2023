import { type TestService } from '../../../all';

export class TestServiceImpl implements TestService {
  async getDataAsync<TData> (functionToGet: () => TData): Promise<TData> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => { resolve(functionToGet()); }, 1000)
    });
  }
}
