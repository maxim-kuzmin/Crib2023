import { type StoreService, createStoreService } from './StoreService';

export interface StoreModule {
  readonly getService: () => StoreService;
}

class Implementation implements StoreModule {
  private readonly service = createStoreService();

  getService (): StoreService {
    return this.service;
  }
}

export function createStoreModule (): StoreModule {
  return new Implementation();
}
